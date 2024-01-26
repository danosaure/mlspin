export type CreateStoreType = {
  STORE: string;
  PRIMARY_KEY: string;
  INDICES: Record<string, boolean>;
};

export default (db: IDBDatabase, record: CreateStoreType) => {
  const store = db.createObjectStore(record.STORE, { keyPath: record.PRIMARY_KEY });

  Object.entries(record.INDICES).forEach((entry) => {
    const columns = entry[0].split(',').map((column) => column.trim());
    const indexName = [record.STORE].concat(columns).join('-');
    store.createIndex(indexName, columns, { unique: entry[1] });
  });
};
