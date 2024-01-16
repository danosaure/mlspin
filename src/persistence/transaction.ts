import MLSPinPersistenceError from './error';

export type PersistenceTransaction = {
  transaction: IDBTransaction;
  stores: Record<string, IDBObjectStore>;
  complete: () => void;
};

export type PersistenceTransactionEventHandlers = {
  onabort?: () => void;
  oncomplete?: () => void;
  onerror?: () => void;
};

export default async (
  db: IDBDatabase | null,
  storeNames: string | string[],
  mode?: IDBTransactionMode,
  eventHanders?: PersistenceTransactionEventHandlers
): Promise<PersistenceTransaction> =>
  new Promise((resolve, reject) => {
    if (db) {
      const transaction: IDBTransaction = db.transaction(storeNames, mode);

      transaction.onabort =
        eventHanders?.onabort ||
        (() => {
          reject(new MLSPinPersistenceError(`Persistence.transaction() aborted`));
        });

      if (eventHanders?.oncomplete) {
        transaction.oncomplete = eventHanders.oncomplete;
      }

      transaction.onerror =
        eventHanders?.onerror ||
        (() => {
          reject(new MLSPinPersistenceError(`Persistence.transaction() error.`));
        });

      let stores: Record<string, IDBObjectStore>;

      if (Array.isArray(storeNames)) {
        stores = storeNames.reduce(
          (stores, storeName) => ({
            ...stores,
            [storeName]: transaction.objectStore(storeName),
          }),
          {}
        );
      } else {
        stores = {
          [storeNames]: transaction.objectStore(storeNames),
        };
      }

      resolve({
        transaction,
        stores,
        complete: () => transaction.commit(),
      });
    } else {
      reject(new MLSPinPersistenceError(`Persistence.transaction() error: call 'open()' first.`));
    }
  });
