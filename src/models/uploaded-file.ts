import type { UploadedFileType } from './types';

class UploadedFile {
  static readonly STORE = 'uploaded-files';

  #data: UploadedFileType;

  constructor(data: UploadedFileType) {
    this.#data = data;
  }

  toJSON(): UploadedFileType {
    return {
      ...this.#data,
    };
  }
}

export { UploadedFile };
