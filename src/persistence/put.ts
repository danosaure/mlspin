import MLSPinPersistenceError from './error';
import get from './get';
import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';

export default async (objectStore: IDBObjectStore, item: PersistenceBaseType, newHistory: PersistenceHistoryType) => {
  const oldItem = await get(objectStore, item.id);

  const newItem = {
    ...oldItem,
    ...item,
    __history: [...((oldItem || {}).__history || []), newHistory],
  };

  return new Promise<void>((resolve, reject) => {
    const putRequest: IDBRequest<IDBValidKey> = objectStore.put(newItem);

    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(new MLSPinPersistenceError(`Error putRequest(${item.id})`));
  });
};
