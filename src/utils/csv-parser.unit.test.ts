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

  describe('No separator params', () => {
    it('Basic use', () => {
      const parsed: CSVParsedType[] = parseCSV('H1;H2\nv1;v2');
      expect(parsed).to.deep.equal([
        {
          H1: 'v1',
          H2: 'v2',
        },
      ]);
    });

    it('Do no split on wrong separator', () => {
      const parsed: CSVParsedType[] = parseCSV('H1|H2\nv1|v2');
      expect(parsed).to.deep.equal([
        {
          'H1|H2': 'v1|v2',
        },
      ]);
    });

    it('Split on second record', () => {
      const parsed: CSVParsedType[] = parseCSV('H1|H2\nv1|v2\nv3;v4');
      expect(parsed).to.deep.equal([
        {
          'H1|H2': 'v1|v2',
        },
        {
          'H1|H2': 'v3',
        },
      ]);
    });
  });

  describe('With separator param', () => {
    it('Basic use', () => {
      const parsed = parseCSV('H1|H2\nv1|v2', '|');
      expect(parsed).to.deep.equal([
        {
          H1: 'v1',
          H2: 'v2',
        },
      ]);
    });

    it('Ignores the default separator', () => {
      const parsed = parseCSV('H1|H2\nv1;v2', '|');
      expect(parsed).to.deep.equal([
        {
          H1: 'v1;v2',
          H2: '',
        },
      ]);
    });
  });
});
