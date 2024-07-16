import type { IDXListingType } from './types';

class IDXListing {
  static readonly STORE = 'idx-listings';

  #data: IDXListingType;

  constructor(data: IDXListingType) {
    this.#data = data;
  }

  toJSON(): IDXListingType {
    return {
      ...this.#data,
    };
  }
}

export { IDXListing };
