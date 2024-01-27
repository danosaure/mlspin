import { MigrationType } from '.';
import createIndexOnStore from './create-index-on-store';

const migrate: MigrationType = async (db: IDBDatabase, transaction: IDBTransaction): Promise<void> => {
  const agentsStore = transaction.objectStore('agents');
  createIndexOnStore(agentsStore, ['office'], false);
};

export default migrate;
