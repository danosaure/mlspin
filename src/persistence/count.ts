import MLSPinPersistenceError from './error';

export class MLSPinPersistenceCountError extends MLSPinPersistenceError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinPersistenceCountError';
  }
}

export default async (idx: IDBIndex): Promise<number> =>
  new Promise((resolve, reject) => {
    try {
      const request = idx.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (e: Event) => reject(new MLSPinPersistenceCountError());
    } catch (e) {
      if (e instanceof Error) {
        reject(new MLSPinPersistenceCountError(e.message));
      } else {
        reject(new MLSPinPersistenceCountError(String(e)));
      }
    }
  });
