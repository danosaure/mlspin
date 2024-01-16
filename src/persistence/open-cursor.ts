export type PersistenceCursor = {
  cursor: IDBCursorWithValue | null;
  key: IDBValidKey | undefined;
  value: any;
  done: boolean;
  continue: () => Promise<PersistenceCursor>;
};

const wrapCursorRequest = (cursorRequest: IDBRequest<IDBCursorWithValue | null>): PersistenceCursor => {
  const cursor = cursorRequest.result;

  return {
    cursor,
    key: cursor?.key,
    value: cursor?.value,
    done: !cursor,
    continue: async (): Promise<PersistenceCursor> =>
      new Promise((resolve, reject) => {
        cursorRequest.onsuccess = () => resolve(wrapCursorRequest(cursorRequest));
        cursorRequest.onerror = () => reject(cursorRequest.error);
        cursor?.continue();
      }),
  };
};

export default async (objectStore: IDBObjectStore): Promise<PersistenceCursor> =>
  new Promise((resolve) => {
    const cursorRequest = objectStore.openCursor();
    cursorRequest.onsuccess = () => resolve(wrapCursorRequest(cursorRequest));
  });
