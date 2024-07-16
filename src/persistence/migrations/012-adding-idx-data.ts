import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  const idxListingsStore = db.createObjectStore('idx-listings', { keyPath: 'LIST_NO' });
  createIndexOnStore(idxListingsStore, ['PROP_TYPE', 'STATUS'], false);
  createIndexOnStore(idxListingsStore, ['LIST_AGENT'], false);
  createIndexOnStore(idxListingsStore, ['LIST_OFFICE'], false);
};

export default migrate;
