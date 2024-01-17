import PersistenceBaseType from '../types/persistence-base';

import AgentType from '../types/agent';

import Base from './base';

export type ZipLookupType = PersistenceBaseType & {
  city?: string;
  neighborhoods: string[];
};

export default class ZipLookup extends Base {
  static readonly STORE = 'zips';
  static readonly INDICES: Record<string, boolean> = {
    city: false,
    neighborhoods: false,
  };

  constructor(data: ZipLookupType) {
    super(data);
  }

  toJSON(): ZipLookupType {
    return super.toJSON() as ZipLookupType;
  }
}
