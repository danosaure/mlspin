import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase, transaction: IDBTransaction): Promise<void> => {
  const officeStore = transaction.objectStore('offices');
  officeStore.deleteIndex('offices-city');
  officeStore.createIndex('by-zip', 'zip');
};

export default migrate;
