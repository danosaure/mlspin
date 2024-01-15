import Persistence from '../persistence';
import { DB_NAME, DB_VERSION } from '../persistence/constants';
import Office from '../models/office';
import Agent from '../models/agent';
import PersistenceHistoryType from '../types/persistence-history';

import parse from './office-results-parser';
import MLSPinPersistenceError from '../persistence/error';

export default async (content: string): Promise<void> => {
  const data = parse(content);

  console.log('data=', data);

  const newHistory: PersistenceHistoryType = {
    date: new Date(),
    action: 'import',
  };

  let persistence: Persistence | undefined;

  return new Promise(async (resolve, reject) => {
    try {
      persistence = new Persistence(DB_NAME, DB_VERSION);
      await persistence.open();

      const transaction: IDBTransaction = await persistence.transaction([Office.STORE, Agent.STORE], 'readwrite');

      transaction.onabort = () => {
        throw new MLSPinPersistenceError('Transaction aborted.');
      };

      transaction.oncomplete = () => {
        console.log(`transaction.oncomplete...`);
        resolve();
      };

      const officeStore = transaction.objectStore(Office.STORE);
      await persistence.putMany(officeStore, Object.values(data.offices), newHistory);

      const agentStore = transaction.objectStore(Agent.STORE);
      await persistence.putMany(agentStore, Object.values(data.agents), newHistory);

      transaction.commit();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown';
      reject(new MLSPinPersistenceError(`Error importing: ${message}`));
    } finally {
      if (persistence) {
        persistence.close();
      }
    }
  });
};
