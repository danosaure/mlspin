import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';

export default async (objectStore: IDBObjectStore, item: PersistenceBaseType, newHistory: PersistenceHistoryType): Promise<void> =>
  new Promise((resolve) => {
    const itemRequest = objectStore.get(item.id);

    itemRequest.onsuccess = () => {
      const oldItem = itemRequest.result;
      const newItem = {
        ...oldItem,
        ...item,
        __history: [...(oldItem.__history || []), newHistory],
      };
      objectStore.put(newItem);
      resolve();
    };

    itemRequest.onerror = () => {
      const newItem = {
        ...item,
        __history: [newHistory],
      };
      objectStore.put(newItem);
      resolve();
    };
  });
