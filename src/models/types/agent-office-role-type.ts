import PersistenceType from '../../persistence/persistence-type';
import { AgentRoleType } from './agent-role-type';

export type AgentOfficeRoleType = PersistenceType & {
  agent: string;
  office: string;
  role: AgentRoleType;
};
