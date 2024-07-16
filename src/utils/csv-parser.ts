import type { CSVParsedType } from './csv-parsed-type';

const SEPARATOR = ';';
const MATCHING_QUOTES = /^(['"]).*\1$/;

const cleanValue = (s: string) => (MATCHING_QUOTES.test(s) ? s.substring(1, s.length - 1) : s);

export const parseCSV = (content: string, separator?: string): CSVParsedType[] => {
  const results: CSVParsedType[] = [];

  const lines = content.trim().replace(/\r\n/g, '\n').split('\n');

  if (lines.length > 1) {
    const headers = lines[0].split(separator || SEPARATOR);

    lines.slice(1).forEach((line: string) => {
      const values = line.split(separator || SEPARATOR);
      const data: CSVParsedType = headers.reduce(
        (obj, attr, idx) => ({
          ...obj,
          [attr]: cleanValue(values[idx]),
        }),
        {}
      );
      results.push(data);
    });
  }

  return results;
};
