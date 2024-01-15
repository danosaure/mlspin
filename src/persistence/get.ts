import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';
import MLSPinPersistenceError from './error';

export default async (objectStore: IDBObjectStore, key: IDBValidKey): Promise<PersistenceBaseType> =>
  new Promise((resolve) => {
    const request = objectStore.get(key);

    request.onsuccess = () => {
      resolve(request.result);
    };
  });
