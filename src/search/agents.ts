import Persistence from '../persistence';
import Office, { OfficeSearchType } from '../models/office';
import Agent, { AgentSearchType } from '../models/agent';
import AgentType from '../types/agent';
import OfficeType from '../types/office';
import { searchOffices } from './offices';

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
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction([Agent.STORE, Office.STORE], 'readonly');

  const officeCriteria: OfficeSearchType = {
    name: office,
    city,
    zip,
  };

  // Offices
  const matchedOffices = await searchOffices(persistence, transaction.stores[Office.STORE], officeCriteria);
  const offices: Record<string, OfficeType> = matchedOffices.reduce(
    (map, office) => ({
      ...map,
      [office.id]: office,
    }),
    {}
  );

  // Agents
  const matches = await new Promise<AgentTypeSearchResult[]>((resolve) => {
    const agents: AgentTypeSearchResult[] = [];

    persistence.openCursor(
      transaction.stores[Agent.STORE],
      (cursor) => {
        const anAgent: AgentType = cursor.value;

        if (Agent.match({ name }, anAgent) && offices[anAgent.office]) {
          agents.push(augmentAgent(anAgent, offices[anAgent.office]));
        }

        cursor.continue();
      },
      () => resolve(agents)
    );
  });

  transaction.complete();
  return matches.sort((a, b) => a.name.localeCompare(b.name));
};
