import Persistence from '../persistence';
import Office from '../models/office';
import Agent from '../models/agent';
import PersistenceHistoryType from '../types/persistence-history';

import parse from './office-results-parser';
import MLSPinPersistenceError from '../persistence/error';
import { PersistenceTransaction } from '../persistence/transaction';

export default async (content: string): Promise<void> => {
  const data = parse(content);

  const newHistory: PersistenceHistoryType = {
    date: new Date(),
    action: 'import',
  };

  let persistence: Persistence | undefined;

  return new Promise(async (resolve, reject) => {
    try {
      persistence = new Persistence();
      await persistence.open();

      const transaction: PersistenceTransaction = await persistence.transaction([Office.STORE, Agent.STORE], 'readwrite', {
        onabort: () => reject(new MLSPinPersistenceError('Transaction aborted.')),
        oncomplete: () => resolve(),
      });

      await persistence.putMany(transaction.stores[Office.STORE], Object.values(data.offices), newHistory);
      await persistence.putMany(transaction.stores[Agent.STORE], Object.values(data.agents), newHistory);

      transaction.complete();
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
