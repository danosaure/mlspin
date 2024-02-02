import { DB_NAME } from './constants';

export type DownloadStoreType = {
  store: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entries: any[];
};

export type DownloadFileMetaType = {
  date: Date;
};

export type DownloadFileJsonType = {
  meta: DownloadFileMetaType;
  data: DownloadStoreType[];
};

/**
 * This is using the low level API to make it faster.
 *
 * @returns
 */
const createBackup = async (): Promise<DownloadFileJsonType> => {
  const db: IDBDatabase = await new Promise((resolve) => {
    const dbReq = indexedDB.open(DB_NAME); // version not important.
    dbReq.onsuccess = () => resolve(dbReq.result);
  });

  const objectStoreNames: string[] = Array.from(db.objectStoreNames);

  const transaction: IDBTransaction = db.transaction(objectStoreNames, 'readonly');

  const data: DownloadStoreType[] = await Promise.all(
    objectStoreNames.map(
      async (store: string) =>
        new Promise<DownloadStoreType>(async (storeResolve) => {
          const objectStore = transaction.objectStore(store);

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const entries: any[] = await new Promise((entriesResolve) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const docs: any[] = [];

            const cursorReq = objectStore.openCursor();
            cursorReq.onsuccess = () => {
              const cursor = cursorReq.result;
              if (cursor) {
                docs.push(cursor.value);
                cursor.continue();
              } else {
                entriesResolve(docs);
              }
            };
          });

          storeResolve({ store, entries });
        })
    )
  );

  db.close();

  return {
    meta: {
      date: new Date(),
    },
    data,
  };
};

export default createBackup;
