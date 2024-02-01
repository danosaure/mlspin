import { expect } from 'chai';

import { parseCSV } from './csv-parser';
import { CSVParsedType } from './csv-parsed-type';

describe(__filename, () => {
  it('should return empty list', () => {
    const parsed: CSVParsedType[] = parseCSV('');
    expect(parsed).to.deep.equal([]);
  });
});
