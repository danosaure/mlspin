import open from './open';
import put from './put';
import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';

import MLSPinPersistenceError from './error';

export default class Persistence {
  private name: string;
  private version: number;
  private db: IDBDatabase | null = null;
  private onchangeversion: (() => void) | undefined;

  constructor(name: string, version: number, onchangeversion?: () => void) {
    this.name = name;
    this.version = version;
    this.onchangeversion = onchangeversion;
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async open(): Promise<void> {
    this.close();

    try {
      this.db = await open(this.name, this.version, this.onchangeversion);
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown Error';
      throw new MLSPinPersistenceError(`Persistence.open() error: ${message}`);
    }
  }

  transaction(storeName: string, mode?: IDBTransactionMode): IDBTransaction {
    if (this.db) {
      return this.db.transaction(storeName, mode);
    }
    throw new MLSPinPersistenceError(`Persistence.transaction() error: call 'open()' first.`);
  }

  async put(objectStore: IDBObjectStore, item: PersistenceBaseType, newHistory: PersistenceHistoryType): Promise<void> {
    return put(objectStore, item, newHistory);
  }
}
