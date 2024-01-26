import migrate from './migrate';

/**
 *  onchangeversion: () => void
 *    callback to link to front-end to ask the user to reload because there is a database change.
 */
export default async (
  dbName: string,
  dbVersion: number,
  currentVersion: number,
  onchangeversion?: () => void
): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => {
      const db = request.result;
      if (onchangeversion) {
        db.onversionchange = () => {
          db.close();
          onchangeversion();
        };
      }
      resolve(db);
    };

    request.onupgradeneeded = () => migrate(request.result, currentVersion);
  });
