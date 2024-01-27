import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';

import createBackup, { DownloadFileJsonType } from './create-backup';
import { DB_NAME, DB_VERSION } from './constants';
import MLSPinPersistenceError from './error';
import get from './get';
import open from './open';
import openCursor from './open-cursor';
import put from './put';
import restoreBackup from './restore-backup';
import transaction, { PersistenceTransaction, PersistenceTransactionEventHandlers } from './transaction';
import { UploadedJsonFileType } from '../components/json-file-uploader-button';

export { MLSPinPersistenceError };

export default class Persistence {
  private db: IDBDatabase | null = null;

  constructor() {}

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async open(onchangeversion?: () => void): Promise<void> {
    this.close();

    try {
      this.db = await open(DB_NAME, DB_VERSION, onchangeversion);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown Error';
      throw new MLSPinPersistenceError(`Persistence.open() error: ${message}`);
    }
  }

  async transaction(
    storeNames: string | string[],
    mode?: IDBTransactionMode,
    eventHanders?: PersistenceTransactionEventHandlers
  ): Promise<PersistenceTransaction> {
    return transaction(this.db, storeNames, mode, eventHanders);
  }

  async put(objectStore: IDBObjectStore, item: PersistenceBaseType, newHistory: PersistenceHistoryType): Promise<void> {
    await put(objectStore, item, newHistory);
  }

  async putMany(objectStore: IDBObjectStore, items: PersistenceBaseType[], newHistory: PersistenceHistoryType): Promise<void> {
    await Promise.all(items.map((item) => this.put(objectStore, item, newHistory)));
  }

  async get(objectStore: IDBObjectStore, key: IDBValidKey): Promise<PersistenceBaseType> {
    return get(objectStore, key);
  }

  openCursor(
    storeOrIndex: IDBObjectStore | IDBIndex,
    withCursor: (cursor: IDBCursorWithValue) => void,
    cursorDone: () => void
  ): void {
    return openCursor(storeOrIndex, withCursor, cursorDone);
  }

  async createBackup(): Promise<DownloadFileJsonType> {
    return createBackup(this);
  }

  async restoreBackup(data: UploadedJsonFileType): Promise<void> {
    return restoreBackup(this, data);
  }
}
