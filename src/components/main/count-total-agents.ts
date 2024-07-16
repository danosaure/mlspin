import Persistence from '../../persistence';
import { Agent } from '../../models';

const countTotalAgents = async (): Promise<number> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction(Agent.STORE, 'readonly');
  const countReq = transaction.stores[Agent.STORE].count();
  const count = await new Promise<number>((resolve) => {
    countReq.onsuccess = () => resolve(countReq.result);
  });
  transaction.complete();
  persistence.close();
  return count;
};

export { countTotalAgents };
