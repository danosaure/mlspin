import MLSPinPersistenceError from './error';
import PersistenceType from './persistence-type';

const putRaw = async (objectStore: IDBObjectStore, item: PersistenceType): Promise<void> => {
  const putRequest: IDBRequest<IDBValidKey> = objectStore.put(item);
  await new Promise<void>((resolve, reject) => {
    putRequest.onsuccess = () => resolve();
    putRequest.onerror = () => reject(new MLSPinPersistenceError('putRaw error'));
  });
};

export { putRaw };
