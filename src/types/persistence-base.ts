import PersistenceHistoryType from './persistence-history';

type PersistenceBaseType = {
  id: string;
  __history?: PersistenceHistoryType[];
};

export default PersistenceBaseType;
