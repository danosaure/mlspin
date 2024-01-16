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

  static match({ name, city, zip }: OfficeSearchType, office: OfficeType): boolean {
    if (name) {
      const officeName = office.name.toLowerCase();

      const matchName = name
        .toLowerCase()
        .split(' ')
        .reduce((result, fragment) => {
          if (!result || !fragment) {
            return result;
          }

          return officeName.indexOf(fragment) !== -1;
        }, true);

      if (!matchName) {
        return false;
      }
    }

    const matchCity = city ? office.city.toLocaleLowerCase().indexOf(city.toLowerCase()) !== -1 : true;
    const matchZip = zip ? office.zip.indexOf(zip) !== -1 : true;

    if (city && zip) {
      return matchCity || matchZip;
    } else if (city) {
      return matchCity;
    } else if (zip) {
      return matchZip;
    }

    return true;
  }
}
