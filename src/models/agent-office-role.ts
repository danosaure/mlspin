import { AgentOfficeRoleType } from './types';

export default class AgentOfficeRole {
  static readonly STORE = 'agents-offices-roles';

  #data: AgentOfficeRoleType;

  constructor(data: AgentOfficeRoleType) {
    this.#data = data;
  }

  toJSON(): AgentOfficeRoleType {
    return {
      ...this.#data,
    };
  }
}
