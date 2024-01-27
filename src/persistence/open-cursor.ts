import MLSPinPersistenceError from './error';

export class MLSPersistenceOpenCursorError extends MLSPinPersistenceError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPersistenceOpenCursorError';
  }
}

export default (
  storeOrIndex: IDBObjectStore | IDBIndex,
  withCursor: (c: IDBCursorWithValue) => void,
  cursorDone: () => void
): void => {
  try {
    const cursorRequest = storeOrIndex.openCursor();

    cursorRequest.onerror = () => {
      throw new MLSPersistenceOpenCursorError();
    };

    cursorRequest.onsuccess = () => {
      const cursor = cursorRequest.result;
      if (cursor) {
        withCursor(cursor);
      } else {
        cursorDone();
      }
    };
  } catch (e) {
    // Probably because the index is empty.
    cursorDone();
  }
};
