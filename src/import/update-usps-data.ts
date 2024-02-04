import { USPS } from '../models';
import { USPSType } from '../models/types';
import Persistence from '../persistence';

export const updateUspsData = async (): Promise<void> => {
  const response = await fetch('assets/usps.json?', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const json = await response.json();

  const persistence = new Persistence();
  await persistence.open();
  const transaction = await persistence.transaction(USPS.STORE, 'readwrite');
  const store = transaction.stores[USPS.STORE];

  await new Promise<void>((resolve) => {
    const clearReq = store.clear();
    clearReq.onsuccess = () => resolve();
  });

  await Promise.all(
    json.map(
      (entry: USPSType) =>
        new Promise<void>((resolve) => {
          const putReq = store.put(entry);
          putReq.onsuccess = () => resolve();
        })
    )
  );

  transaction.complete();

  persistence.close();
};
