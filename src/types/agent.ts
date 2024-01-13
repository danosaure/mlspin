import AgentRoleType from './agent-role';

type AgentType = {
  id: string;
  email: string;
  name: string;
  phone: string;
  office: string;
  role: AgentRoleType;
};

export default AgentType;
