import generateIndexName from './generate-index-name';

const createIndexOnStore = (store: IDBObjectStore, columns: string[], unique: boolean): void => {
  const indexName = generateIndexName(store.name, columns);
  store.createIndex(indexName, columns, { unique });
};

export default createIndexOnStore;
