import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  db.deleteObjectStore('idx-fields-reference');

  const idxFieldsReferenceStore = db.createObjectStore('idx-fields-reference', { keyPath: ['Field', 'Short'] });
  createIndexOnStore(idxFieldsReferenceStore, ['sf'], false);
  createIndexOnStore(idxFieldsReferenceStore, ['cc'], false);
};

export default migrate;
