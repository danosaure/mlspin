import type { IDXReferenceTownType } from './types';

class IDXReferenceTown {
  static readonly STORE = 'idx-towns';

  #data: IDXReferenceTownType;

  constructor(data: IDXReferenceTownType) {
    this.#data = data;
  }

  toJSON(): IDXReferenceTownType {
    return {
      ...this.#data,
    };
  }
}

export { IDXReferenceTown };
