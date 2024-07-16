import PersistenceType from '../../persistence/persistence-type';

export type IDXFieldReferenceType = PersistenceType & {
  Short: string;
  Medium: string;
  Long: string;
  Field: string;
  sf: '0' | '1';
  cc: '0' | '1';
  mf: '0' | '1';
  ld: '0' | '1';
  ci: '0' | '1';
  bu: '0' | '1';
  rn: '0' | '1';
  mh: '0' | '1';
};
