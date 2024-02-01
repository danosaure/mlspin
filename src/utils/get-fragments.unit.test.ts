import { expect } from 'chai';

import { getFragments } from './get-fragments';

describe(__filename, () => {
  it('returns empty array when empty string', () => {
    expect(getFragments('')).to.deep.equal([]);
  });

  it('returns a single when no space', () => {
    expect(getFragments('foo')).to.deep.equal(['foo']);
  });

  it('trims beginning spaces', () => {
    expect(getFragments(' foo')).to.deep.equal(['foo']);
  });

  it('trims ending spaces', () => {
    expect(getFragments('foo  ')).to.deep.equal(['foo']);
  });

  it('handles multiple spaces in between', () => {
    expect(getFragments('  foo    bar   ')).to.deep.equal(['foo', 'bar']);
  });
});
