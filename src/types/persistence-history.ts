import PersistenceHistoryActionType from './persistence-history-action';

type PersistenceHistoryType = {
  date: Date;
  action: PersistenceHistoryActionType;
  message?: string;
};

export default PersistenceHistoryType;
