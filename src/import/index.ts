import Persistence from '../persistence';
import { DB_NAME, DB_VERSION } from '../persistence/constants';
import Office from '../models/office';
import Agent from '../models/agent';
import PersistenceHistoryType from '../types/persistence-history';

import parse from './office-results-parser';

export default async (content: string): Promise<void> => {
  const data = parse(content);

  console.log('data=', data);

  const newHistory: PersistenceHistoryType = {
    date: new Date(),
    action: 'import',
  };

  let persistence: Persistence | undefined;

  try {
    persistence = new Persistence(DB_NAME, DB_VERSION);
    await persistence.open();

    [
      [Office, data.offices],
      [Agent, data.agents],
    ].forEach(async ([Model, items]): Promise<void> => {
      if (persistence) {
        const transaction: IDBTransaction | undefined = persistence.transaction(Model.STORE as string, 'readwrite');
        if (transaction) {
          const objectStore: IDBObjectStore = transaction.objectStore(Model.STORE as string);
          // TODO: #1 - async
          // TODO: #2 - only update fields and keep non-mls data.
          Object.values(items).forEach(async (item): Promise<void> => {
            if (persistence) {
              persistence.put(objectStore, item, newHistory);
            }
          });
        }
      }
    });
  } finally {
    if (persistence) {
      persistence.close();
    }
  }
};
