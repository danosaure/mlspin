import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  // Agents
  const agentsStore = db.createObjectStore('agents', { keyPath: 'id' });
  createIndexOnStore(agentsStore, ['name'], false);
  createIndexOnStore(agentsStore, ['email'], false);

  // Offices
  const officesStore = db.createObjectStore('offices', { keyPath: 'id' });
  createIndexOnStore(officesStore, ['city'], false);
  createIndexOnStore(officesStore, ['name', 'zip'], false);

  // Zip Lookups
  const zipsStore = db.createObjectStore('zips', { keyPath: 'id' });
  createIndexOnStore(zipsStore, ['neighborhoods'], false);
};

export default migrate;
