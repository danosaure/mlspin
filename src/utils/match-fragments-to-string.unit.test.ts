import { expect } from 'chai';
import path from 'path';

import namespace from './namespace';
import { matchFragmentsToString } from './match-fragments-to-string';

describe(namespace(path.basename(__filename)), () => {
  it('matches when no fragments', () => {
    expect(matchFragmentsToString('', [])).to.be.true();
    expect(matchFragmentsToString('foo', [])).to.be.true();
  });

  it('matches when one fragment equal to string', () => {
    expect(matchFragmentsToString('foo', ['foo'])).to.be.true();
  });

  it('matches when fragment partial of string', () => {
    expect(matchFragmentsToString('longstring', ['ongs'])).to.be.true();
  });

  it('matches partial fragment multiple words', () => {
    expect(matchFragmentsToString(' long string ', ['ring'])).to.be.true();
  });

  it('matches multiple fragments on one word', () => {
    expect(matchFragmentsToString('longword', ['long', 'word'])).to.be.true();
  });

  it('matches multiple fragments on random order', () => {
    expect(matchFragmentsToString('longword', ['word', 'long'])).to.be.true();
  });

  it("doesn't match when fragment different", () => {
    expect(matchFragmentsToString('something real', ['WRONG'])).to.be.false();
  });

  it("doesn't match when at least one fragment absent", () => {
    expect(matchFragmentsToString('something real', ['WRONG', 'real'])).to.be.false();
    expect(matchFragmentsToString('something real', ['real', 'WRONG'])).to.be.false();
    expect(matchFragmentsToString('something real', ['something', 'real', 'WRONG'])).to.be.false();
  });
});
