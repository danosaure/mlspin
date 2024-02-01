import { AgentOfficeRoleType, AgentRoleType, AgentType, OfficeType, ZipLookupType } from '../models/types';
import { parseCSV } from '../utils';
import { CSVParsedType } from '../utils/csv-parsed-type';
import { OfficeResultsType } from './office-results-type';

const extractAgentAndOffice = (
  lineData: CSVParsedType
): [agent: AgentType, office: OfficeType, agentOfficeRole: AgentOfficeRoleType, zipLookup: ZipLookupType] => [
  {
    id: lineData['agent.id'],
    name: lineData['agent.name'],
    email: lineData['agent.email'],
    phone: lineData['agent.phone'],
  },
  {
    id: lineData['office.id'],
    name: lineData['office.name'],
    address: lineData['office.address'],
    zip: lineData['office.zip'],
  },
  {
    agent: lineData['agent.id'],
    office: lineData['office.id'],
    role: lineData['agent.role'] as AgentRoleType,
  },
  {
    id: lineData['office.zip'],
    neighborhoods: [lineData['office.city']],
  },
];

export default (content: string): OfficeResultsType => {
  const csvContent: CSVParsedType[] = parseCSV(content);

  return csvContent.reduce(
    (cache, lineData: CSVParsedType) => {
      const [agent, office, agentOfficeRole, zipLookup] = extractAgentAndOffice(lineData);
      if (!agent.id) {
        return cache;
      }
      return {
        agents: {
          ...cache.agents,
          [agent.id]: agent,
        },
        offices: {
          ...cache.offices,
          [office.id]: office,
        },
        agentsOfficesRoles: [...cache.agentsOfficesRoles, agentOfficeRole],
        zipLookups: {
          ...cache.zipLookups,
          [zipLookup.id]: {
            ...cache.zipLookups[zipLookup.id],
            neighborhoods: [...cache.zipLookups[zipLookup.id].neighborhoods, ...zipLookup.neighborhoods],
          },
        },
      };
    },
    { agents: {}, offices: {}, agentsOfficesRoles: [], zipLookups: {} } as OfficeResultsType
  );
};
