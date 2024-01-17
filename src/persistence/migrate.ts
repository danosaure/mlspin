import Agent from '../models/agent';
import Office from '../models/office';

export default async (db: IDBDatabase): Promise<void> => {
  [Office, Agent].forEach((record) => {
    const store = db.createObjectStore(record.STORE, { keyPath: record.PRIMARY_KEY });

    Object.entries(record.INDICES).forEach((entry) => {
      const columns = entry[0].split(',');
      const indexName = [record.STORE].concat(columns).join('-');
      store.createIndex(indexName, columns, { unique: entry[1] });
    });
  });
};
