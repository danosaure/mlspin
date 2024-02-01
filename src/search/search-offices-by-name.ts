import { Office } from '../models';
import { OfficeType } from '../models/types';
import { PersistenceTransaction } from '../persistence/transaction';
import { getFragments, matchFragmentsToString } from '../utils';

const searchOfficesByName = async (name: string, transaction: PersistenceTransaction): Promise<Record<string, OfficeType>> =>
  new Promise<Record<string, OfficeType>>((resolve) => {
    const offices: Record<string, OfficeType> = {};

    const cursorReq = transaction.stores[Office.STORE].openCursor();
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;

      if (cursor) {
        const office: OfficeType = cursor.value;

        if (matchFragmentsToString(office.name, getFragments(name))) {
          offices[office.id] = office;
        }

        cursor.continue();
      } else {
        resolve(offices);
      }
    };
  });

export default searchOfficesByName;
