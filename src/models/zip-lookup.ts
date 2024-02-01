import Persistence from '../persistence';
import { PersistenceTransaction } from '../persistence/transaction';

import Base from './base';
import { newHistory } from './persistence-history';
import { ZipLookupJsonType, ZipLookupType } from './types';

export default class ZipLookup extends Base {
  static readonly STORE = 'zips';

  constructor(data: ZipLookupType) {
    super(data);
  }

  toJSON(): ZipLookupJsonType {
    return super.toJSON() as ZipLookupJsonType;
  }

  static fromJSON(json: ZipLookupJsonType): ZipLookupType {
    return {
      ...super.fromJSON(json),
      city: json.city,
      neighborhoods: json.neighborhoods || [],
    };
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

    const history = newHistory('user');

    await persistence?.put(objectStore, newItem, history);

    if (localeTransaction) {
      transaction.complete();
    }

    return new ZipLookup(newItem);
  }
}
