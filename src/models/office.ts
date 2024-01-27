import { AgentType } from './agent';
import Base, { PersistenceBaseType } from './base';

export type OfficeSearchType = {
  name?: string;
  city?: string;
  zip?: string;
};

export type OfficeType = PersistenceBaseType & {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type OfficeResults = {
  agents: Record<string, AgentType>;
  offices: Record<string, OfficeType>;
};

export default class Office extends Base {
  static readonly STORE = 'offices';
  static readonly SEARCH_INDEX = 'offices-name-zip';

  constructor(data: OfficeType) {
    super(data);
  }

  toJSON(): OfficeType {
    return this.toJSON() as OfficeType;
  }
}
