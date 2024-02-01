import Base from './base';
import { AgentJsonType, AgentType } from './types';

export default class Agent extends Base {
  static readonly STORE = 'agents';

  constructor(data: AgentType) {
    super(data);
  }

  toJSON(): AgentJsonType {
    return super.toJSON() as AgentJsonType;
  }

  static fromJSON(json: AgentJsonType): AgentType {
    return {
      ...super.fromJSON(json),
      email: json.email,
      name: json.name,
      phone: json.phone,
    };
  }
}
