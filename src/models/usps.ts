import Base from './base';
import { USPSType } from './types';

export default class USPS extends Base {
  static readonly STORE = 'usps';

  constructor(data: USPSType) {
    super(data);
  }
}
