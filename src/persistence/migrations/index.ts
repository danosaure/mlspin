import migration001 from './001-initial-structure';
import migration002 from './002-adding-usps-store';
import migration003 from './003-adding-index-agent-office';

export type MigrationType = (db: IDBDatabase, transaction: IDBTransaction) => Promise<void>;

const migrations: Record<string, MigrationType> = {
  1: migration001,
  2: migration002,
  3: migration003,
};

export default migrations;
