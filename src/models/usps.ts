import PersistenceBaseType from '../types/persistence-base';
import Base from './base';

export type USPSType = PersistenceBaseType & {
  name: string;
  alternatives?: string[];
};

export default class USPS extends Base {
  static readonly STORE = 'usps';

  constructor(data: USPSType) {
    super(data);
  }
}
