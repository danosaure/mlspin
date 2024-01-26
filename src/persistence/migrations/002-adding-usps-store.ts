import createStore from './create-store';
import { USPS } from '../../models';

export default async (db: IDBDatabase): Promise<void> => {
  createStore(db, USPS);
};
