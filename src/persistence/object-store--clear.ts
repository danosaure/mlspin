export default async (objectStore: IDBObjectStore): Promise<void> =>
  new Promise((resolve) => {
    const clearRequest = objectStore.clear();
    clearRequest.onsuccess = () => resolve();
  });
