import get from './get';
import open from './open';
import put from './put';
import transaction from './transaction';
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

  async transaction(storeNames: string | string[], mode?: IDBTransactionMode): Promise<IDBTransaction> {
    return transaction(this.db, storeNames, mode);
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

}
