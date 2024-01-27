import migration001 from './001-initial-structure';
import migration002 from './002-adding-usps-store';
import migration003 from './003-adding-index-agent-office';
import migration004 from './004-adding-user-preferences';

export type MigrationType = (db: IDBDatabase, transaction: IDBTransaction) => Promise<void>;

const migrations: Record<string, MigrationType> = {
  1: migration001,
  2: migration002,
  3: migration003,
  4: migration004,
};

export default migrations;
