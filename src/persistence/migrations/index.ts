import migration001 from './001-initial-structure';
import migration002 from './002-adding-usps-store';
import migration003 from './003-adding-index-agent-office';
import migration004 from './004-adding-user-preferences';
import migration005 from './005-adding-agent-office-role';
import migration006 from './006-deprecated-indices';
import MigrationType from './migration-type';

const migrations: Record<string, MigrationType> = {
  1: migration001,
  2: migration002,
  3: migration003,
  4: migration004,
  5: migration005,
  6: migration006,
};

export default migrations;
