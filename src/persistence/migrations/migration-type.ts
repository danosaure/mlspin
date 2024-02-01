type MigrationType = (db: IDBDatabase, transaction: IDBTransaction) => Promise<void>;

export default MigrationType;
