import PersistenceBaseType from '../types/persistence-base';

export default abstract class Base {
  static readonly PRIMARY_KEY = 'id';

  data: PersistenceBaseType;

  constructor(data: PersistenceBaseType) {
    this.data = { ...data };
  }

  toJSON() {
    return { ...this.data };
  }
}
