import { PersistenceBaseType } from './persistence-base-type';

export type USPSType = PersistenceBaseType & {
  name: string;
  alternatives?: string[];
};
