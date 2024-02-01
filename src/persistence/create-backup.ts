import Persistence from './index';
import { Agent, Office, USPS, ZipLookup } from '../models';
import { PersistenceBaseType } from '../models/types';

export type DownloadStoreType = {
  store: string;
  entries: PersistenceBaseType[];
};

export type DownloadFileMetaType = {
  date: Date;
};

export type DownloadFileJsonType = {
  meta: DownloadFileMetaType;
  data: DownloadStoreType[];
};

const backup = async (persistence: Persistence): Promise<DownloadFileJsonType> => {
  await persistence.open();

  const transaction = await persistence.transaction([Agent.STORE, Office.STORE, ZipLookup.STORE]);

  const data = await Promise.all(
    [Agent.STORE, Office.STORE, USPS.STORE, ZipLookup.STORE].map(
      async (store: string) =>
        new Promise<DownloadStoreType>((resolve) => {
          const entries: PersistenceBaseType[] = [];

          persistence.openCursor(
            transaction.stores[store],
            (cursor) => {
              entries.push(cursor.value);
              cursor.continue();
            },
            () =>
              resolve({
                store,
                entries,
              })
          );
        })
    )
  );

  return {
    meta: {
      date: new Date(),
    },
    data,
  };
};

export default backup;
