import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  // Agents
  const uploadedFilesStore = db.createObjectStore('uploaded-files', { autoIncrement: true });
  createIndexOnStore(uploadedFilesStore, ['filename'], false);
};

export default migrate;
