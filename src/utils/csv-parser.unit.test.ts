import { expect } from 'chai';

import { CSVParsedType, parseCSV } from './csv-parser';

describe(__filename, () => {
  it('should return empty list', () => {
    const parsed: CSVParsedType[] = parseCSV('');
    expect(parsed).to.deep.equal([]);
  });
});
