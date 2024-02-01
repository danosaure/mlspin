import { PersistenceBaseJsonType } from './persistence-base-json-type';

export type ZipLookupJsonType = PersistenceBaseJsonType & {
  city: string;
  neighborhoods: string[];
};
