import { PersistenceBaseJsonType } from './persistence-base-json-type';

export type OfficeJsonType = PersistenceBaseJsonType & {
  name: string;
  address: string;
  zip: string;
};
