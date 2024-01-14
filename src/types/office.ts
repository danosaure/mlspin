import PersistenceBaseType from './persistence-base';

type OfficeType = PersistenceBaseType & {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export default OfficeType;
