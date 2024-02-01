import { searchOffices } from './search-offices';
import { Agent, Office, ZipLookup } from '../models';
import Persistence from '../persistence';
import AgentOfficeRole from '../models/agent-office-role';
import { AgentOfficeRoleType, AgentType } from '../models/types';
import mergeAgentData from './agent-merge-data';
import { AgentSearchResultType, AgentSearchType, OfficeSearchResultType } from './types';
import { getFragments, matchFragmentsToString } from '../utils';

export const searchAgents = async ({ name, office, city, zip, roles }: AgentSearchType): Promise<AgentSearchResultType[]> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction(
    [Agent.STORE, Office.STORE, ZipLookup.STORE, AgentOfficeRole.STORE],
    'readonly'
  );

  // Offices
  const matchedOffices = await searchOffices({ name: office, city, zip }, transaction);
  const offices: Record<string, OfficeSearchResultType> = matchedOffices.reduce(
    (map, office) => ({
      ...map,
      [office.id]: office,
    }),
    {}
  );

  // Agents-Offices-Roles
  //    Find all agents linked to matching offices
  const matchedAgentsOfficesRoles = await new Promise<Record<string, AgentOfficeRoleType[]>>((resolve) => {
    const matches: Record<string, AgentOfficeRoleType[]> = {};
    const agentOfficeRoleIndex = transaction.stores[AgentOfficeRole.STORE].index('by-office');
    const cursorReq = agentOfficeRoleIndex.openCursor();
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor) {
        if (offices[cursor.key as string]) {
          const agentOfficeRole: AgentOfficeRoleType = cursor.value;

          // TODO: Validate Role.
          matches[agentOfficeRole.agent] = [...(matches[agentOfficeRole.agent] || []), agentOfficeRole];
        }

        cursor.continue();
      } else {
        resolve(matches);
      }
    };
  });

  // Agents
  const matches = await new Promise<AgentSearchResultType[]>((resolve) => {
    const agents: AgentSearchResultType[] = [];

    persistence.openCursor(
      transaction.stores[Agent.STORE],
      (cursor) => {
        const foundAgentOfficeRoles: AgentOfficeRoleType[] = matchedAgentsOfficesRoles[cursor.key as string];
        if (foundAgentOfficeRoles) {
          const agent: AgentType = cursor.value;
          if (matchFragmentsToString(agent.name, getFragments(name))) {
            foundAgentOfficeRoles.forEach((agentOfficeRole) => {
              console.log(`roles=[${roles}]   =?=   agentOfficeRole.role="${agentOfficeRole.role}"`);
              agents.push(mergeAgentData(cursor.value, agentOfficeRole, offices[agentOfficeRole.office]));
            });
          }
        }

        cursor.continue();
      },
      () => resolve(agents)
    );
  });

  transaction.complete();
  return matches.sort((a, b) => a.agentName.localeCompare(b.agentName));
};
