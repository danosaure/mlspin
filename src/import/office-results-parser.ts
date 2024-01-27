import { parseCSV, CSVParsedType } from '../utils';
import { AgentRoleType, AgentType, OfficeResults, OfficeType } from '../models';

const extractAgentAndOffice = (lineData: CSVParsedType): [agent: AgentType, office: OfficeType] => [
  {
    id: lineData['agent.id'],
    name: lineData['agent.name'],
    email: lineData['agent.email'],
    phone: lineData['agent.phone'],
    role: lineData['agent.role'] as AgentRoleType,
    office: lineData['office.id'],
  },
  {
    id: lineData['office.id'],
    name: lineData['office.name'],
    address: lineData['office.address'],
    city: lineData['office.city'],
    state: lineData['office.state'],
    zip: lineData['office.zip'],
  },
];

export default (content: string): OfficeResults => {
  const csvContent: CSVParsedType[] = parseCSV(content);

  return csvContent.reduce(
    (cache, lineData: CSVParsedType) => {
      const [agent, office] = extractAgentAndOffice(lineData);
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
      };
    },
    { agents: {}, offices: {} }
  );
};
