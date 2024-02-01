import { fromJSON as persistenceHistoryFromJSON, toJSON as persistenceHistoryToJSON } from './persistence-history';
import { PersistenceBaseJsonType, PersistenceBaseType } from './types';

abstract class Base {
  static readonly PRIMARY_KEY = 'id';

  data: PersistenceBaseType;

  constructor(data: PersistenceBaseType) {
    this.data = { ...data };
  }

  toJSON() {
    return {
      ...this.data,
      __history: persistenceHistoryToJSON(this.data.__history || []),
    };
  }

  static fromJSON(json: PersistenceBaseJsonType): PersistenceBaseType {
    return {
      id: json.id,
      __history: persistenceHistoryFromJSON(json.__history || []),
    };
  }
}

export default Base;
