import { PersistenceBaseType } from './persistence-base-type';

export type OfficeType = PersistenceBaseType & {
  name: string;
  address: string;
  zip: string;
};
