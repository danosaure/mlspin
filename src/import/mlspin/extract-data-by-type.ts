import { AgentOfficeRoleType, PersistenceBaseType, ZipLookupType } from '../../models/types';
import EXTRACTED_DATA_TYPES from './extract-data-types';
import { ImportedOfficeResultsLineType } from './extract-line-data';

export default (
  data: ImportedOfficeResultsLineType[],
  dataType: EXTRACTED_DATA_TYPES
): (AgentOfficeRoleType | PersistenceBaseType)[] => {
  const elements = data.map((d) => d[dataType]);

  switch (dataType) {
    case EXTRACTED_DATA_TYPES.AGENT_OFFICE_ROLE: {
      return elements as AgentOfficeRoleType[];
    }
    case EXTRACTED_DATA_TYPES.ZIP_LOOKUP: {
      const elementsByZip = (elements as ZipLookupType[]).reduce(
        (cache, element: ZipLookupType): Record<string, ZipLookupType> => ({
          ...cache,
          [element.id]: {
            ...element,
            neighborhoods: [...(cache[element.id]?.neighborhoods || []), ...element.neighborhoods],
          },
        }),
        {} as Record<string, ZipLookupType>
      );
      return Object.values(elementsByZip);
    }
    default: {
      const elementsByID = (elements as PersistenceBaseType[]).reduce(
        (cache, element): Record<string, PersistenceBaseType> => ({
          ...cache,
          [element.id]: element,
        }),
        {}
      );
      return Object.values(elementsByID) as PersistenceBaseType[];
    }
  }
};
