import { AgentRoleType } from '../../models/types';

export type AgentSearchResultType = {
  id: string; // agentId
  agentName: string;
  agentEmail: string;
  agentPhone: string;
  agentRole: AgentRoleType;
  officeId: string;
  officeName: string;
  officeAddress: string;
  officeCity: string;
  officeZip: string;
};
