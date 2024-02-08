import { expect } from 'chai';
import path from 'path';

import namespace from './namespace';
import { displayName } from './display-name';

describe(namespace(path.basename(__filename)), () => {
  it('returns original if no components', () => {
    const ns = namespace('foo');
    expect(displayName(ns)).to.equal(ns);
  });

  it('returns only after components', () => {
    const ns = namespace(['ignore', 'this', 'components', 'Remember', 'This']);
    expect(displayName(ns)).to.equal('Remember.This');
  });
});
