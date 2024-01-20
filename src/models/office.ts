import OfficeType from '../types/office';

import Base from './base';

export type OfficeSearchType = {
  name?: string;
  city?: string;
  zip?: string;
};

export default class Office extends Base {
  static readonly STORE = 'offices';
  static readonly INDICES: Record<string, boolean> = {
    city: false, // for city mapping.
    'name,zip': false, // for search -> index `offices-name-zip`.
  };
  static readonly SEARCH_INDEX = 'offices-name-zip';

  constructor(data: OfficeType) {
    super(data);
  }

  toJSON(): OfficeType {
    return this.toJSON() as OfficeType;
  }
}
