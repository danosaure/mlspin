import PersistenceType from '../../persistence/persistence-type';
import { IDXListingPropTypeType } from './idx-listing-prop-type-type';
import { IDXListingStatusType } from './idx-listing-status-type';

export type IDXListingType = PersistenceType & {
  PROP_TYPE: IDXListingPropTypeType;
  LIST_NO: string;
  LIST_AGENT: string;
  LIST_OFFICE: string;
  STATUS: IDXListingStatusType;
};
