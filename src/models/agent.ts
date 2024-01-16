import AgentType from '../types/agent';

import Base from './base';

export type AgentSearchType = {
  name?: string;
  office?: string;
  city?: string;
  zip?: string;
};

export default class Agent extends Base {
  static readonly STORE = 'agents';
  static readonly INDICES: Record<string, boolean> = {
    name: false,
    email: false,
  };

  constructor(data: AgentType) {
    super(data);
  }

  toJSON(): AgentType {
    return super.toJSON() as AgentType;
  }

  static match({ name }: AgentSearchType, agent: AgentType): boolean {
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

    return true;
  }
}
