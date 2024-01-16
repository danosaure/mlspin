import Persistence from '../persistence';
import Office, { OfficeSearchType } from '../models/office';
import OfficeType from '../types/office';

export default async (criteria: OfficeSearchType): Promise<OfficeType[]> => {
  const matches: OfficeType[] = [];

  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction(Office.STORE, 'readonly');
  let cursor = await persistence.openCursor(transaction.stores[Office.STORE]);

  while (!cursor.done) {
    if (Office.match(criteria, cursor.value)) {
      matches.push(cursor.value);
    }

    cursor = await cursor.continue();
  }

  transaction.complete();
  return matches.sort((a, b) => a.name.localeCompare(b.name));
};
