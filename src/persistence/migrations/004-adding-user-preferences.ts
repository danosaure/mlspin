import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  db.createObjectStore('user-preferences', { keyPath: 'id' });
};

export default migrate;
