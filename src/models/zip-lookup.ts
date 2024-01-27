import Persistence from '../persistence';
import { PersistenceTransaction } from '../persistence/transaction';

import Base, { PersistenceBaseType, PersistenceHistoryType } from './base';

export type ZipLookupType = PersistenceBaseType & {
  city?: string;
  neighborhoods: string[];
};

export default class ZipLookup extends Base {
  static readonly STORE = 'zips';

  constructor(data: ZipLookupType) {
    super(data);
  }

  toJSON(): ZipLookupType {
    return super.toJSON() as ZipLookupType;
  }

  static async updateNeighborhoods(
    id: string,
    neighborhoods: string[],
    transaction?: PersistenceTransaction,
    persistence?: Persistence
  ): Promise<ZipLookup> {
    let localeTransaction = false;

    if (!transaction) {
      if (!persistence) {
        persistence = new Persistence();
        await persistence.open();
      }

      transaction = await persistence.transaction([this.STORE], 'readwrite');
      localeTransaction = true;
    }

    const objectStore = transaction.stores[this.STORE];

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

    if (localeTransaction) {
      transaction.complete();
    }

    return new ZipLookup(newItem);
  }
}
