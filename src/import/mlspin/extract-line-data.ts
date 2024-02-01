import { AgentOfficeRoleType, AgentRoleType, AgentType, OfficeType, ZipLookupType } from '../../models/types';
import { CSVParsedType } from '../../utils/csv-parsed-type';

import EXTRACTED_DATA_TYPES from './extract-data-types';

export type ImportedOfficeResultsLineType = {
  [EXTRACTED_DATA_TYPES.AGENT]: AgentType;
  [EXTRACTED_DATA_TYPES.OFFICE]: OfficeType;
  [EXTRACTED_DATA_TYPES.AGENT_OFFICE_ROLE]: AgentOfficeRoleType;
  [EXTRACTED_DATA_TYPES.ZIP_LOOKUP]: ZipLookupType;
};

export default (lineData: CSVParsedType): ImportedOfficeResultsLineType => ({
  [EXTRACTED_DATA_TYPES.AGENT]: {
    id: lineData['agent.id'],
    name: lineData['agent.name'],
    email: lineData['agent.email'],
    phone: lineData['agent.phone'],
  },
  [EXTRACTED_DATA_TYPES.OFFICE]: {
    id: lineData['office.id'],
    name: lineData['office.name'],
    address: lineData['office.address'],
    zip: lineData['office.zip'],
  },
  [EXTRACTED_DATA_TYPES.AGENT_OFFICE_ROLE]: {
    agent: lineData['agent.id'],
    office: lineData['office.id'],
    role: lineData['agent.role'] as AgentRoleType,
  },
  [EXTRACTED_DATA_TYPES.ZIP_LOOKUP]: {
    id: lineData['office.zip'],
    neighborhoods: [lineData['office.city']],
  },
});
