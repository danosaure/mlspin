import { UploadedFile } from '../models';
import Persistence from '../persistence';

const logUploadedFile = async (filename: string, size: number, type: string): Promise<void> => {
  const persistence = new Persistence();
  await persistence.open();
  const transaction = await persistence.transaction([UploadedFile.STORE], 'readwrite');

  return new Promise((resolve, reject) => {
    transaction.transaction.oncomplete = () => {
      resolve();
    };

    transaction.transaction.onerror = () => {
      reject(new Error('logUploadedFile(): transaction.onerror()'));
    };

    const req = transaction.stores[UploadedFile.STORE].add({ date: Date.now(), filename, size, type });
    req.onsuccess = () => {
      transaction.complete();
    };

    req.onerror = () => {
      console.error('logUploadedFile():', req.result);
    };
  });
};

export { logUploadedFile };
