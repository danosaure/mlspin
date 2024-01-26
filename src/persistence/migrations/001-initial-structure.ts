import { Agent, Office, ZipLookup } from '../../models';
import createStore from './create-store';

export default async (db: IDBDatabase): Promise<void> => {
  [Office, Agent, ZipLookup].forEach((record) => createStore(db, record));
};
