import { PersistenceHistoryActionType, PersistenceHistoryJsonType, PersistenceHistoryType } from './types';

const newHistory = (action: PersistenceHistoryActionType, message?: string): PersistenceHistoryType => ({
  date: new Date(),
  action,
  message,
});

const toJSON = (history: PersistenceHistoryType[]): PersistenceHistoryJsonType[] =>
  history.map((h) => ({
    ...h,
    date: h.date.toISOString(),
  }));

const fromJSON = (history: PersistenceHistoryJsonType[]): PersistenceHistoryType[] =>
  history.map((h) => ({
    ...h,
    date: new Date(h.date),
  }));

export { fromJSON, newHistory, toJSON };
