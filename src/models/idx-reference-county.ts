import type { IDXReferenceCountyType } from './types';

class IDXReferenceCounty {
  static readonly STORE = 'idx-counties';

  #data: IDXReferenceCountyType;

  constructor(data: IDXReferenceCountyType) {
    this.#data = data;
  }

  toJSON(): IDXReferenceCountyType {
    return {
      ...this.#data,
    };
  }
}

export { IDXReferenceCounty };
