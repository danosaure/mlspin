import { IDXListing } from '../../../models';
import Persistence from '../../../persistence';
import { MLSPinImportIDXDataResetError } from './error';

const resetIDXListingByFilename = async (objectStore: IDBObjectStore, filename: string): Promise<void> => {
  let propType: 'SF' | 'CC';
  let filter: (status: string) => boolean;

  if (filename === 'idx_sf.txt') {
    //  Remove all existing single family listings that are active.
    propType = 'SF';
    filter = (status: string) => status !== 'SLD';
  } else if (filename === 'idx_sf_sld.txt') {
    // Remove all existing single family listings that are sold.
    propType = 'SF';
    filter = (status: string) => status === 'SLD';
  } else if (filename === 'idx_cc.txt') {
    // Remove all existing condo listings that are active.
    propType = 'CC';
    filter = (status: string) => status !== 'SLD';
  } else if (filename === 'idx_cc_sld.txt') {
    // Remove all existing condo listings that are sold.
    propType = 'CC';
    filter = (status: string) => status === 'SLD';
  } else {
    throw new MLSPinImportIDXDataResetError(`Unknown filename: ${filename}`);
  }

  const index: IDBIndex = objectStore.index('idx-listings-PROP_TYPE-STATUS');

  const indexRequest = index.openKeyCursor(IDBKeyRange.bound([propType, ''], [propType, 'ZZZ']), 'next');
  indexRequest.onsuccess = (event: Event) => {
    const cursor = event.target as IDBCursorWithValue;
    if (cursor) {
      const item = cursor.value as IDXListing;
      console.log("cursor=", cursor);
    //   if (filter(item.STATUS)) {
    //     cursor.delete();
    //   } else {
    //     cursor.continue();
    //   }
    // }
  };
};

export { resetIDXListingByFilename };
