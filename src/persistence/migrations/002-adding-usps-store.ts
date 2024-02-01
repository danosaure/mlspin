import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  db.createObjectStore('usps', { keyPath: 'id' });
};

export default migrate;
