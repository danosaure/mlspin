export type CSVParsedType = Record<string, string>;

const SEPARATOR = ';';
const MATCHING_QUOTES = /^(['"]).*\1$/;

const cleanValue = (s: string) => (MATCHING_QUOTES.test(s) ? s.substring(1, s.length - 1) : s);

export const parseCSV = (content: string): CSVParsedType[] => {
  const results: CSVParsedType[] = [];

  const lines = content.trim().split('\n');

  if (lines.length > 1) {
    const headers = lines[0].split(SEPARATOR);

    lines.slice(1).forEach((line: string) => {
      const values = line.split(SEPARATOR);
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
