import AgentRoleType from './agent-role';
import PersistenceBaseType from './persistence-base';

type AgentType = PersistenceBaseType & {
  email: string;
  name: string;
  phone: string;
  office: string;
  role: AgentRoleType;
};

export default AgentType;
