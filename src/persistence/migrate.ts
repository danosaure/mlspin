import migrations from './migrations';

export default async (db: IDBDatabase, currentVersion: number): Promise<void> => {
  for (let version = currentVersion; version <= db.version; version++) {
    console.log(`Running migration ${version}`);
    await migrations[version](db);
  }
};
