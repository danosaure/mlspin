import { IDXListing } from '../../models';
import Persistence from '../../persistence';
import { putManyRaw } from '../../persistence/put-many-raw';
import { CSVParsedType } from '../../utils/csv-parsed-type';

const importIDXListings = async (filename: string, content: CSVParsedType[]): Promise<void> => {
  const persistence = new Persistence();
  await persistence.open();
  const transaction = await persistence.transaction([IDXListing.STORE], 'readwrite');
  const objectStore = transaction.stores[IDXListing.STORE];

  // TODO: Remove old data

  console.log(`importIDXData(): filename=${filename}; content=(${content.length})`, content);

  // TODO: Filter for existing agents and offices only.

  await putManyRaw(objectStore, content);

  transaction.complete();
};

export { importIDXListings };
