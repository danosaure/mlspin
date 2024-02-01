import PersistenceType from '../../persistence/persistence-type';
import { PersistenceHistoryType } from './persistence-history-type';

export type PersistenceBaseType = PersistenceType & {
  id: string;
  __history?: PersistenceHistoryType[];
};
