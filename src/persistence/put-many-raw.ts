import PersistenceType from './persistence-type';
import { putRaw } from './put-raw';

const putManyRaw = async (objectStore: IDBObjectStore, items: PersistenceType[]): Promise<void> => {
  await Promise.all(items.map((item) => putRaw(objectStore, item)));
};

export { putManyRaw };
