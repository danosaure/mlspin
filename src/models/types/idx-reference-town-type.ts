import PersistenceType from '../../persistence/persistence-type';

export type IDXReferenceTownType = PersistenceType & {
  TOWN_NUM: number;
  LONG: string;
  COUNTY: string;
  STATE: string;
};
