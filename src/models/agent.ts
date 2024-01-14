import AgentType from '../types/agent';

import Base from './base';

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
}
