import AgentType from '../types/agent';

import Base from './base';

const ROLES_MAPPINGS = {
  A: 'Subscribers',
  S: 'Office Contacts',
  T: 'Teams',
};

export type AgentSearchRolesType = keyof typeof ROLES_MAPPINGS;
export type AgentSearchType = {
  name?: string;
  office?: string;
  city?: string;
  zip?: string;
  roles?: AgentSearchRolesType[];
};

export default class Agent extends Base {
  static readonly STORE = 'agents';

  constructor(data: AgentType) {
    super(data);
  }

  toJSON(): AgentType {
    return super.toJSON() as AgentType;
  }

  static match({ name, roles }: AgentSearchType, agent: AgentType): boolean {
    if (name) {
      const agentName = agent.name.toLowerCase();

      const matchName = name
        .toLowerCase()
        .split(' ')
        .reduce((result, fragment) => {
          if (!result || !fragment) {
            return result;
          }

          return agentName.indexOf(fragment) !== -1;
        }, true);

      if (!matchName) {
        return false;
      }
    }

    if (roles && roles.length) {
      const mapped = roles.map((r) => ROLES_MAPPINGS[r]);
      return mapped.indexOf(agent.role) !== -1;
    }

    return true;
  }
}
