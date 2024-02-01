import { AgentSearchRolesType } from './agent-search-roles-type';

export type AgentSearchType = {
  name: string;
  office: string;
  city: string;
  zip: string;
  roles: AgentSearchRolesType[];
};
