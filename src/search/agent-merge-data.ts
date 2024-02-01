import { AgentOfficeRoleType, AgentType } from '../models/types';
import { AgentSearchResultType, OfficeSearchResultType } from './types';

const mergeAgentData = (
  agent: AgentType,
  agentOfficeRole: AgentOfficeRoleType,
  office: OfficeSearchResultType
): AgentSearchResultType => ({
  id: agent.id,
  agentName: agent.name,
  agentEmail: agent.email,
  agentPhone: agent.phone,
  agentRole: agentOfficeRole.role,
  officeId: office.id,
  officeName: office.name,
  officeAddress: office.address,
  officeCity: office.city,
  officeZip: office.zip,
});

export default mergeAgentData;
