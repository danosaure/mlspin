import Persistence from '../persistence';
import Office, { OfficeSearchType } from '../models/office';
import Agent, { AgentSearchType } from '../models/agent';
import AgentType from '../types/agent';
import OfficeType from '../types/office';
import { PersistenceCursor } from '../persistence/open-cursor';

export type AgentTypeSearchResult = AgentType & {
  '_office.id': string;
  '_office.name': string;
  '_office.address': string;
  '_office.city': string;
  '_office.state': string;
  '_office.zip': string;
};

const augmentAgent = (agent: AgentType, office: OfficeType): AgentTypeSearchResult => {
  const officeAttributes = Object.entries(office).reduce((attrs, [attr, value]) => {
    if (attr.startsWith('_')) {
      return attrs;
    }
    return {
      ...attrs,
      [`_office.${attr}`]: value,
    };
  }, {});

  return {
    ...agent,
    ...officeAttributes,
  } as AgentTypeSearchResult;
};

export default async ({ name, office, city, zip }: AgentSearchType): Promise<AgentTypeSearchResult[]> => {
  const matches: AgentTypeSearchResult[] = [];

  const offices: Record<string, OfficeType> = {};

  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction([Agent.STORE, Office.STORE], 'readonly');

  let cursor: PersistenceCursor;

  // Offices
  cursor = await persistence.openCursor(transaction.stores[Office.STORE]);

  const officeCriteria: OfficeSearchType = {
    name: office,
    city,
    zip,
  };

  while (!cursor.done) {
    const anOffice: OfficeType = cursor.value;

    if (Office.match(officeCriteria, anOffice)) {
      offices[anOffice.id] = anOffice;
    }

    cursor = await cursor.continue();
  }

  // Agents
  cursor = await persistence.openCursor(transaction.stores[Agent.STORE]);
  while (!cursor.done) {
    const anAgent: AgentType = cursor.value;

    if (Agent.match({ name }, anAgent) && offices[anAgent.office]) {
      matches.push(augmentAgent(anAgent, offices[anAgent.office]));
    }

    cursor = await cursor.continue();
  }

  transaction.complete();
  return matches.sort((a, b) => a.name.localeCompare(b.name));
};
