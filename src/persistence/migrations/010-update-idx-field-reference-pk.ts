import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  db.deleteObjectStore('idx-fields-reference');

  const idxFieldsReferenceStore = db.createObjectStore('idx-fields-reference', { autoIncrement: true });
  createIndexOnStore(idxFieldsReferenceStore, ['Field'], false);
  createIndexOnStore(idxFieldsReferenceStore, ['sf', 'Field'], false);
  createIndexOnStore(idxFieldsReferenceStore, ['cc', 'Field'], false);
};

export default migrate;
