import Persistence from '../../persistence';
import { Office } from '../../models';

const countTotalOffices = async (): Promise<number> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction(Office.STORE, 'readonly');
  const countReq = transaction.stores[Office.STORE].count();
  const count = await new Promise<number>((resolve) => {
    countReq.onsuccess = () => resolve(countReq.result);
  });
  transaction.complete();
  persistence.close();
  return count;
};

export default countTotalOffices;
