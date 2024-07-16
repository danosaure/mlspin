import migration001 from './001-initial-structure';
import migration002 from './002-adding-usps-store';
import migration003 from './003-adding-index-agent-office';
import migration004 from './004-adding-user-preferences';
import migration005 from './005-adding-agent-office-role';
import migration006 from './006-deprecated-indices';
import migration007 from './007-idx-reference-tables';
import migration008 from './008-update-idx-field-reference-index';
import migration009 from './009-update-idx-field-reference-index';
import migration010 from './010-update-idx-field-reference-pk';
import migration011 from './011-adding-file-upload-log';
import MigrationType from './migration-type';

const migrations: Record<string, MigrationType> = {
  1: migration001,
  2: migration002,
  3: migration003,
  4: migration004,
  5: migration005,
  6: migration006,
  7: migration007,
  8: migration008,
  9: migration009,
  10: migration010,
  11: migration011,
};

export default migrations;
