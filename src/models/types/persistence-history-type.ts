import { PersistenceHistoryActionType } from './persistence-history-action-type';

export type PersistenceHistoryType = {
  date: Date;
  action: PersistenceHistoryActionType;
  message?: string;
};
