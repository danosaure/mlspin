import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';
import MLSPinPersistenceError from './error';
import get from './get';

export default async (
  objectStore: IDBObjectStore,
  item: PersistenceBaseType,
  newHistory: PersistenceHistoryType
): Promise<void> => {
  const oldItem = await get(objectStore, item.id);

  const newItem = {
    ...oldItem,
    ...item,
    __history: [...((oldItem || {}).__history || []), newHistory],
  };

  return new Promise((resolve, reject) => {
    const putRequest: IDBRequest<IDBValidKey> = objectStore.put(newItem);

    putRequest.onsuccess = () => {
      // console.log(`[${item.id}]: putRequest.onsuccess():`, putRequest.result);
      resolve();
    };

    putRequest.onerror = () => reject(new MLSPinPersistenceError(`Error putRequest(${item.id})`));
  });
};
