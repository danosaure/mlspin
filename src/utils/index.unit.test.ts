import { expect } from 'chai';
import path from 'path';

import namespace from './namespace';
import * as index from './index';

describe(namespace(path.basename(__filename)), () => {
  it('contains expected exports', () => {
    expect(index).to.have.property('parseCSV');
    expect(index).to.have.property('displayName');
    expect(index).to.have.property('getFragments');
    expect(index).to.have.property('hasOwnProperty');
    expect(index).to.have.property('matchFragmentsToString');
    expect(index).to.have.property('matchFragmentsToStringArray');
    expect(index).to.have.property('preventDefault');
    expect(index).to.have.property('sortAlpha');
  });
});
