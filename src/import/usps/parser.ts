import { USPSType } from '../../models/types';
import { parseCSV } from '../../utils';
import { CSVParsedType } from '../../utils/csv-parsed-type';

export default (content: string): Record<string, USPSType> => {
  const csvContent: CSVParsedType[] = parseCSV(content);
  return csvContent.reduce(
    (zips, entry): Record<string, USPSType> => {
      if (entry) {
        return {
          ...zips,
          [entry['usps.zip']]: {
            id: entry['usps.zip'],
            name: entry['usps.city'],
            alternatives: entry['usps.cities'] ? entry['usps.cities'].split(',').map((city: string) => city.trim()) : [],
          },
        };
      }
      return zips;
    },
    {} as Record<string, USPSType>
  );
};
