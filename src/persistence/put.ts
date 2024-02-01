import { PersistenceBaseType, PersistenceHistoryType } from '../models/types';
import { hasOwnProperty } from '../utils';
import MLSPinPersistenceError from './error';
import get from './get';
import PersistenceType from './persistence-type';

export default async (objectStore: IDBObjectStore, item: PersistenceType, newHistory: PersistenceHistoryType) => {
  let newItem: PersistenceType;

  if (hasOwnProperty(item, 'id')) {
    const oldItem = await get(objectStore, (item as PersistenceBaseType).id);

    newItem = {
      ...oldItem,
      ...item,
      __history: [...((oldItem || {}).__history || []), newHistory],
    };
  } else {
    newItem = item;
  }

  return new Promise<void>((resolve, reject) => {
    const putRequest: IDBRequest<IDBValidKey> = objectStore.put(newItem);

    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () =>
      reject(
        new MLSPinPersistenceError(`Error putRequest(${hasOwnProperty(item, 'id') ? (item as PersistenceBaseType).id : 'Unknown'})`)
      );
  });
};
