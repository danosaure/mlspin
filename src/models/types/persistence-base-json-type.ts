import { PersistenceHistoryJsonType } from './persistence-history-json-type';

export type PersistenceBaseJsonType = {
  id: string;
  __history: PersistenceHistoryJsonType[];
};
