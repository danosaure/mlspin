import Base from './base';
import { OfficeJsonType, OfficeType } from './types';

export default class Office extends Base {
  static readonly STORE = 'offices';
  static readonly SEARCH_INDEX = 'offices-name-zip';

  constructor(data: OfficeType) {
    super(data);
  }

  toJSON(): OfficeJsonType {
    return super.toJSON() as OfficeJsonType;
  }

  static fromJSON(json: OfficeJsonType): OfficeType {
    return {
      ...super.fromJSON(json),
      name: json.name,
      address: json.address,
      zip: json.zip,
    };
  }
}
