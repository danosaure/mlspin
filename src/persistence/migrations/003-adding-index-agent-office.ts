import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase, transaction: IDBTransaction): Promise<void> => {
  const agentsStore = transaction.objectStore('agents');
  createIndexOnStore(agentsStore, ['office'], false);
};

export default migrate;
