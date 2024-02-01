import { PersistenceBaseType } from './persistence-base-type';

export type UserPreferenceType = PersistenceBaseType & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};
