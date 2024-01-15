import MLSPinPersistenceError from './error';

export default async (db: IDBDatabase | null, storeNames: string | string[], mode?: IDBTransactionMode): Promise<IDBTransaction> =>
  new Promise((resolve, reject) => {
    if (db) {
      const transaction: IDBTransaction = db.transaction(storeNames, mode);

      transaction.onabort = () => {
        reject(new MLSPinPersistenceError(`Persistence.transaction() aborted`));
      };

      transaction.oncomplete = () => {
        console.log(`transaction on "[${storeNames}]/${mode}" completed.`);
      };

      transaction.onerror = () => {
        reject(new MLSPinPersistenceError(`Persistence.transaction() error.`));
      };

      resolve(transaction);
    } else {
      reject(new MLSPinPersistenceError(`Persistence.transaction() error: call 'open()' first.`));
    }
  });
