import { PersistenceHistoryActionType } from './persistence-history-action-type';

export type PersistenceHistoryJsonType = {
  date: string;
  action: PersistenceHistoryActionType;
  message?: string;
};
