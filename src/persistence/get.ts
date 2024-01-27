import { PersistenceBaseType } from '../models/base';

export default async (objectStore: IDBObjectStore, key: IDBValidKey): Promise<PersistenceBaseType> =>
  new Promise((resolve) => {
    const request = objectStore.get(key);

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
