export type PersistenceHistoryActionType = 'import' | 'restore' | 'user' | 'system';

export type PersistenceHistoryType = {
  date: Date;
  action: PersistenceHistoryActionType;
  message?: string;
};

export type PersistenceBaseType = {
  id: string;
  __history?: PersistenceHistoryType[];
};

abstract class Base {
  static readonly PRIMARY_KEY = 'id';

  data: PersistenceBaseType;

  constructor(data: PersistenceBaseType) {
    this.data = { ...data };
  }

  toJSON() {
    return { ...this.data };
  }
}

export default Base;
