import { MLSPinPersistenceError } from '.';
import migrations from './migrations';

export class MLSPinPersistenceMigrateError extends MLSPinPersistenceError {
  constructor(message?: string) {
    super(message);
    this.name = 'MLSPinPersistenceMigrateError';
  }
}

export default async (db: IDBDatabase, transaction: IDBTransaction, currentVersion: number): Promise<void> => {
  for (let version = currentVersion + 1; version <= db.version; version++) {
    const migrate = migrations[version];
    if (migrate) {
      await migrate(db, transaction);
    } else {
      throw new MLSPinPersistenceMigrateError(`Unable to find migration ${version}.`);
    }
  }
};
