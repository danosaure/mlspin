import Persistence from '../persistence';
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

  static async findLastUploaded(filename: string): Promise<string> {
    const persistence = new Persistence();
    await persistence.open();
    const transaction = await persistence.transaction([UploadedFile.STORE]);
    const index = transaction.stores[UploadedFile.STORE].index('uploaded-files-filename');
    const cursorReq = index.openCursor(IDBKeyRange.only([filename]), 'prev');

    return new Promise((resolve) => {
      cursorReq.onsuccess = () => {
        const cursor = cursorReq.result;
        if (cursor) {
          const date = new Date(cursor.value.date);
          resolve(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
        } else {
          resolve('NEVER');
        }
      };
    });
  }
}

export { UploadedFile };
