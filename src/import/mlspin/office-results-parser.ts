import { parseCSV } from '../../utils';
import extractLineData, { ImportedOfficeResultsLineType } from './extract-line-data';

export default (content: string): ImportedOfficeResultsLineType[] => {
  const csvContent = parseCSV(content);

  return csvContent.reduce((cache, lineData) => {
    const data = extractLineData(lineData);
    if (!data.agent.id) {
      // Skip blank lines.
      return cache;
    }
    return cache.concat(data);
  }, [] as ImportedOfficeResultsLineType[]);
};
