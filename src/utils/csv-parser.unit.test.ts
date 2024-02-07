import { expect } from 'chai';
import path from 'path';

import namespace from './namespace';

import { parseCSV } from './csv-parser';
import { CSVParsedType } from './csv-parsed-type';

describe(namespace(path.basename(__filename)), () => {
  it('should return empty list', () => {
    const parsed: CSVParsedType[] = parseCSV('');
    expect(parsed).to.deep.equal([]);
  });
});
