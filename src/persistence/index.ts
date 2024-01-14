import PersistenceType from '../types/persistence';
import * as idb from './indexeddb';

import MLSPinPersistenceError from './error';

export default class Persistence {
    private persistence: any;
    private dbName: string;
    private dbVersion: number;
    private db: IDBDatabase | null = null;
    private onchangeversion: (() => void) | undefined;

    constructor(persistenceType:PersistenceType, dbName: string, dbVersion: number, onchangeversion?: () => void) {
        this.dbName = dbName;
        this.dbVersion = dbVersion;
        this.onchangeversion = onchangeversion;

        if (persistenceType === PersistenceType.IndexedDB) {
            this.persistence = idb;
        } else {
            throw new MLSPinPersistenceError(`PersistenceType "${persistenceType}" not implemented yet.`);
        }
    }

    close(): void {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }

    async open(): Promise<void> {
        this.close();

        return new Promise(async (resolve, reject) => {
            try {
                this.db = await this.persistence.open(this.dbName, this.dbVersion, this.onchangeversion);
                resolve();
            } catch (e) {
                const message = (e instanceof Error) ? e.message : 'Unknown Error';
                throw new MLSPinPersistenceError(`Persistence.open() error: ${message}`);
            }

        });

    }

    transaction(storeName: string, mode?: IDBTransactionMode): IDBTransaction {
        if (this.db) {
            return this.db.transaction(storeName, mode);
        }
        throw new MLSPinPersistenceError(`Persistence.transaction() error: call 'open()' first.`);
    }


}
