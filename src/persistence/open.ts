import migrate from './migrate';

export default async (dbName: string, dbVersion: number, onchangeversion?: () => void): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = () => {
      console.log('request.onerror()...');
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log('request.onsuccess()...');
      const db = request.result;
      if (onchangeversion) {
        db.onversionchange = () => {
          db.close();
          onchangeversion();
        };
      }
      resolve(db);
    };

    request.onupgradeneeded = () => {
      console.log(`onupgradeneeded()...`);
      migrate(request.result);
    };
  });
