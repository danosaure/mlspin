import type { IDXFieldReferenceType } from './types';

class IDXFieldReference {
  static readonly STORE = 'idx-fields-reference';

  #data: IDXFieldReferenceType;

  constructor(data: IDXFieldReferenceType) {
    this.#data = data;
  }

  toJSON(): IDXFieldReferenceType {
    return {
      ...this.#data,
    };
  }
}

export { IDXFieldReference };
