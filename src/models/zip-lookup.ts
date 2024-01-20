import Persistence from '../persistence';
import { PersistenceTransaction } from '../persistence/transaction';
import PersistenceBaseType from '../types/persistence-base';
import PersistenceHistoryType from '../types/persistence-history';

import Base from './base';

export type ZipLookupType = PersistenceBaseType & {
  neighborhoods: string[];
};

export default class ZipLookup extends Base {
  static readonly STORE = 'zips';
  static readonly INDICES: Record<string, boolean> = {
    neighborhoods: false,
  };

  constructor(data: ZipLookupType) {
    super(data);
  }

  toJSON(): ZipLookupType {
    return super.toJSON() as ZipLookupType;
  }

  static async updateNeighborhoods(
    id: string,
    neighborhoods: string[],
    objectStore?: IDBObjectStore,
    transaction?: PersistenceTransaction,
    persistence?: Persistence
  ): Promise<ZipLookup> {
    if (!objectStore) {
      if (!transaction) {
        if (!persistence) {
          persistence = new Persistence();
          await persistence.open();
        }

        transaction = await persistence.transaction([ZipLookup.STORE], 'readwrite');
      }

      objectStore = transaction.stores[ZipLookup.STORE];
    }

    const oldItem: ZipLookupType = (await persistence?.get(objectStore, id)) as ZipLookupType;

    const newItem: ZipLookupType = {
      ...oldItem,
      neighborhoods,
    };

    const newHistory: PersistenceHistoryType = {
      date: new Date(),
      action: 'user',
    };

    await persistence?.put(objectStore, newItem, newHistory);

    transaction?.complete();

    return new ZipLookup(newItem);
  }
}
