import Persistence from './index';
import { Agent, Office, ZipLookup, ZipLookupType } from '../models';
import AgentType from '../types/agent';
import OfficeType from '../types/office';
import PersistenceBaseType from '../types/persistence-base';

export type DownloadFileJsonType = {
  agents: AgentType[];
  offices: OfficeType[];
  zipLookups: ZipLookupType[];
};

const backup = async (persistence: Persistence): Promise<DownloadFileJsonType> => {
  await persistence.open();

  const transaction = await persistence.transaction([Agent.STORE, Office.STORE, ZipLookup.STORE]);

  const [agents, offices, zipLookups] = await Promise.all(
    [Agent.STORE, Office.STORE, ZipLookup.STORE].map(
      async (store) =>
        new Promise<PersistenceBaseType[]>((resolve) => {
          const results: PersistenceBaseType[] = [];

          persistence.openCursor(
            transaction.stores[store],
            (cursor) => {
              results.push(cursor.value);
              cursor.continue();
            },
            () => resolve(results)
          );
        })
    )
  );

  return { agents: agents as AgentType[], offices: offices as OfficeType[], zipLookups: zipLookups as ZipLookupType[] };
};

export default backup;
