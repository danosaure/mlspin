import migration001 from './001-initial-structure';

export type MigrationType = (db: IDBDatabase) => Promise<void>;

const migrations: Record<string, MigrationType> = {
  1: migration001,
};

export default migrations;
