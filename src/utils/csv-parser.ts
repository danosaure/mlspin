export type CSVParsedType = Record<string, string>;

const SEPARATOR = ';';

export default (content: string): CSVParsedType[] => {
  const results: CSVParsedType[] = [];

  const lines = content.split('\n');

  if (lines.length > 1) {
    const headers = lines[0].split(SEPARATOR);

    lines.slice(1).forEach((line: string) => {
      const values = line.split(SEPARATOR);
      const data: CSVParsedType = headers.reduce(
        (obj, attr, idx) => ({
          ...obj,
          [attr]: values[idx],
        }),
        {}
      );
      results.push(data);
    });
  }

  return results;
};
