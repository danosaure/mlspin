import migration001 from './001-initial-structure';
import migration002 from './002-adding-usps-store';

export type MigrationType = (db: IDBDatabase) => Promise<void>;

const migrations: Record<string, MigrationType> = {
  1: migration001,
  2: migration002,
};

export default migrations;
