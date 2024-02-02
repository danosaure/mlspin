import { USPS, ZipLookup } from '../../models';
import { USPSType, ZipLookupType } from '../../models/types';
import Persistence from '../../persistence';
import { PersistenceTransaction } from '../../persistence/transaction';
import { sortAlpha } from '../../utils';

export const mergeZipLookupsWithCurrent = async (
  persistence: Persistence,
  transaction: PersistenceTransaction,
  zips: ZipLookupType[]
): Promise<ZipLookupType[]> =>
  Promise.all(
    zips.map(async (zip): Promise<ZipLookupType> => {
      const oldItem = (await persistence.get(transaction.stores[ZipLookup.STORE], zip.id)) as ZipLookupType;

      // Always update with USPS data.
      const usps = (await persistence.get(transaction.stores[USPS.STORE], zip.id)) as USPSType;
      const city = usps.name;
      const alternatives = usps.alternatives || [];

      const neighborhoods = Array.from(
        new Set(
          [city]
            .concat(alternatives)
            .concat(oldItem?.neighborhoods || [])
            .concat(zip.neighborhoods || [])
        ).values()
      ).sort(sortAlpha);

      return {
        ...oldItem,
        ...zip,
        city,
        neighborhoods,
      };
    })
  );
