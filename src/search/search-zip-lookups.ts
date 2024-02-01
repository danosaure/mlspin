import { ZipLookupType } from '../models/types';
import ZipLookup from '../models/zip-lookup';
import Persistence from '../persistence';
import { searchZipLookupByCityOrZip } from './search-zip-lookup-by-city-or-zip';

export const searchZipLookup = async (): Promise<Record<string, ZipLookupType>> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction(ZipLookup.STORE);

  try {
    return await searchZipLookupByCityOrZip('', '', transaction);
  } finally {
    transaction.complete();
    persistence.close();
  }
};
