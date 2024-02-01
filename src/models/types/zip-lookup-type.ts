import { PersistenceBaseType } from './persistence-base-type';

export type ZipLookupType = PersistenceBaseType & {
  city?: string;
  neighborhoods: string[];
};
