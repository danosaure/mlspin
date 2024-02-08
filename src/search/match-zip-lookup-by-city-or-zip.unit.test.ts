import { expect } from 'chai';
import path from 'path';

import namespace from './namespace';

import { ZipLookupType } from '../models/types';
import { matchZipLookupByCityOrZip } from './match-zip-lookup-by-city-or-zip';

describe(namespace(path.basename(__filename)), () => {
  const ZIP_LOOKUP: ZipLookupType = { id: '90210', city: 'Some City', neighborhoods: ['Some', 'Neighborhood'] };

  it('matches when no criteria', () => {
    expect(matchZipLookupByCityOrZip('', '', ZIP_LOOKUP)).to.be.true();
  });

  it("doesn't match when match city, but not neighborhoods", () => {
    expect(matchZipLookupByCityOrZip('Some City', '', ZIP_LOOKUP)).to.be.false();
  });

  it('matches when matching one neighborhood', () => {
    expect(matchZipLookupByCityOrZip('Neighborhood', '', ZIP_LOOKUP)).to.be.true();
  });

  it('matches when matching neighborhood case-insensitive', () => {
    expect(matchZipLookupByCityOrZip('nEIghBorHoOD', '', ZIP_LOOKUP)).to.be.true();
  });

  it('matches when partial neighborhood', () => {
    expect(matchZipLookupByCityOrZip('eighb', '', ZIP_LOOKUP)).to.be.true();
  });

  it('matches zip ', () => {
    expect(matchZipLookupByCityOrZip('', '90210', ZIP_LOOKUP)).to.be.true();
  });

  it('matches partial zip', () => {
    expect(matchZipLookupByCityOrZip('', '21', ZIP_LOOKUP)).to.be.true();
  });

  it('matches when city matches but not zip', () => {
    expect(matchZipLookupByCityOrZip('eighb', '55', ZIP_LOOKUP)).to.be.true();
  });

  it('matches when zip matches but not city', () => {
    expect(matchZipLookupByCityOrZip('WRONG', '21', ZIP_LOOKUP)).to.be.true();
  });

  it("doesn't match when neither city nor zip match", () => {
    expect(matchZipLookupByCityOrZip('WRONG', '55', ZIP_LOOKUP)).to.be.false();
  });
});
