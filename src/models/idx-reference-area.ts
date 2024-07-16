import type { IDXReferenceAreaType } from './types';

class IDXReferenceArea {
  static readonly STORE = 'idx-areas';

  #data: IDXReferenceAreaType;

  constructor(data: IDXReferenceAreaType) {
    this.#data = data;
  }

  toJSON(): IDXReferenceAreaType {
    return {
      ...this.#data,
    };
  }
}

export { IDXReferenceArea };
