import { expect } from 'chai';

import * as index from './index';

describe(__filename, () => {
  it('contains expected exports', () => {
    expect(index).to.have.property('parseCSV');
    expect(index).to.have.property('getFragments');
    expect(index).to.have.property('hasOwnProperty');
    expect(index).to.have.property('matchFragmentsToString');
    expect(index).to.have.property('matchFragmentsToStringArray');
    expect(index).to.have.property('preventDefault');
    expect(index).to.have.property('sortAlpha');
  });
});
