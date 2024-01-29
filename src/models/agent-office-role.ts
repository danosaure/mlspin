import Base, { PersistenceBaseType } from './base';

export type AgentRoleType = 'Office Contacts' | 'Subscribers' | 'Teams';

export type AgentOfficeRoleType = PersistenceBaseType & {
  agent: string;
  office: string;
  role: AgentRoleType;
};

export default class AgentOfficeRole extends Base {
  static readonly STORE = 'agent-office-role';

  constructor(data: AgentOfficeRoleType) {
    super(data);
  }

  toJSON(): AgentOfficeRoleType {
    return this.toJSON() as AgentOfficeRoleType;
  }
}
