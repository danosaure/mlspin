import { z } from 'zod';

import Persistence from './index';
import { Agent, Office, ZipLookup } from '../models';
import PersistenceBaseType, { PersistenceBaseZod } from '../types/persistence-base';

const DownloadStoreZod = z.object({
  store: z.string(),
  entries: z.array(PersistenceBaseZod),
});
export type DownloadStoreType = z.infer<typeof DownloadStoreZod>;

const DownloadFileMetaZod = z.object({
  date: z.date(),
});
export type DownloadFileMetaType = z.infer<typeof DownloadFileMetaZod>;

export type DownloadFileJsonType = {
  meta: DownloadFileMetaType;
  data: DownloadStoreType[];
};

const backup = async (persistence: Persistence): Promise<DownloadFileJsonType> => {
  await persistence.open();

  const transaction = await persistence.transaction([Agent.STORE, Office.STORE, ZipLookup.STORE]);

  const data = await Promise.all(
    [Agent.STORE, Office.STORE, ZipLookup.STORE].map(
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
