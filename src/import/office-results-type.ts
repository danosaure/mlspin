import { AgentOfficeRoleType, AgentType, OfficeType, ZipLookupType } from '../models/types';

export type OfficeResultsType = {
  agents: Record<string, AgentType>;
  offices: Record<string, OfficeType>;
  agentsOfficesRoles: AgentOfficeRoleType[];
  zipLookups: Record<string, ZipLookupType>;
};
