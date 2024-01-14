import OfficeType from '../types/office';

import Base from './base';

export default class Office extends Base {
  static readonly STORE = 'offices';
  static readonly PRIMARY_KEY = 'id';
  static readonly INDICES: Record<string, boolean> = {
    name: false,
    city: false,
    zip: false,
};
  constructor(data: OfficeType) {
    super(data);
  }

  toJSON(): OfficeType {
    return this.toJSON() as OfficeType;
  }
}
