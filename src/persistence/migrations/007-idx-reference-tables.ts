import createIndexOnStore from './create-index-on-store';
import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase): Promise<void> => {
  const idxCountiesStore = db.createObjectStore('idx-counties', { keyPath: 'SHORT' });
  createIndexOnStore(idxCountiesStore, ['LONG'], false);

  const idxTownsStore = db.createObjectStore('idx-towns', { keyPath: 'TOWN_NUM' });
  createIndexOnStore(idxTownsStore, ['COUNTY'], false);
  createIndexOnStore(idxTownsStore, ['STATE'], false);

  const idxAreasStore = db.createObjectStore('idx-areas', { keyPath: 'SHORT' });
  createIndexOnStore(idxAreasStore, ['LONG'], false);

  const idxFieldsReferenceStore = db.createObjectStore('idx-fields-reference', { keyPath: 'Short' });
  createIndexOnStore(idxFieldsReferenceStore, ['Field'], false);
  createIndexOnStore(idxFieldsReferenceStore, ['sf'], false);
  createIndexOnStore(idxFieldsReferenceStore, ['cc'], false);
};

export default migrate;
