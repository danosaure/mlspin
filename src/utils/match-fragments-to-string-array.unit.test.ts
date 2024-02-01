import { expect } from 'chai';

import { matchFragmentsToStringArray } from './match-fragments-to-string-array';

describe(__filename, () => {
  it('fails if no strings to match even when fragment is empty string', () => {
    expect(matchFragmentsToStringArray([], [''])).to.be.false();
  });

  it('matches when empty fragments', () => {
    expect(matchFragmentsToStringArray([], [])).to.be.true();
    expect(matchFragmentsToStringArray(['foo', 'bar'], [])).to.be.true();
  });

  it('matches when all fragments in single string', () => {
    expect(matchFragmentsToStringArray(['this is a lovely string'], ['string', 'love'])).to.be.true();
    expect(matchFragmentsToStringArray(['foo', 'this is a lovely string'], ['string', 'love'])).to.be.true();
    expect(matchFragmentsToStringArray(['this is a lovely string', 'foo'], ['string', 'love'])).to.be.true();
  });

  it("doesn't match when partial fragment only", () => {
    expect(matchFragmentsToStringArray(['this', 'is', 'in', 'multiple', 'string'], ['this', 'string'])).to.be.false();
  });
});
