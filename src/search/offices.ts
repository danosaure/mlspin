import searchZipLookup from './zip-lookup';
import { Agent, Office, OfficeSearchType, OfficeType, ZipLookup } from '../models';
import Persistence from '../persistence';
import { PersistenceTransaction } from '../persistence/transaction';

type OfficeSearchWithZipLookupType = OfficeSearchType & {
  zipLookups: string[];
};

const matchOffice = ({ name, city, zip, zipLookups }: OfficeSearchWithZipLookupType, [keyName, keyZip]: string[]): boolean => {
  if (name) {
    const officeName = keyName.toLocaleLowerCase();
    const matchName = name
      .toLocaleLowerCase()
      .split(' ')
      .reduce((match, fragment) => {
        if (!match || !fragment) {
          return match;
        }
        return officeName.indexOf(fragment) !== -1;
      }, true);
    if (!matchName) {
      return false;
    }
  }

  const matchCity = city ? zipLookups.indexOf(keyZip) !== -1 : true;
  const matchZip = zip ? keyZip.indexOf(zip) !== -1 : true;

  if (city && zip) {
    return matchCity || matchZip;
  } else if (city) {
    return matchCity;
  } else if (zip) {
    return matchZip;
  }

  return true;
};

export const searchOffices = async (
  persistence: Persistence,
  transaction: PersistenceTransaction,
  criteria: OfficeSearchType
): Promise<OfficeType[]> => {
  let zipLookups: string[] = [];
  if (criteria.city) {
    const zipLookupMatches = await searchZipLookup({ city: criteria.city }, persistence, transaction);
    zipLookups = zipLookupMatches.map((zipLookup) => zipLookup.id);
  }

  const criteriaWithZipLookups: OfficeSearchWithZipLookupType = {
    ...criteria,
    zipLookups,
  };

  return new Promise((resolve) => {
    const matches: OfficeType[] = [];

    persistence.openCursor(
      transaction.stores[Office.STORE].index(Office.SEARCH_INDEX),
      (cursor) => {
        if (matchOffice(criteriaWithZipLookups, cursor.key as string[])) {
          matches.push(cursor.value);
        }
        cursor.continue();
      },
      () => {
        resolve(matches);
      }
    );
  });
};

export type OfficesSearchResultsType = OfficeType & {
  agentsCount: number;
};

export default async (criteria: OfficeSearchType, persistence?: Persistence): Promise<OfficesSearchResultsType[]> => {
  if (!persistence) {
    persistence = new Persistence();
    await persistence.open();
  }

  const transaction = await persistence.transaction([Agent.STORE, Office.STORE, ZipLookup.STORE], 'readonly');

  const matches = await searchOffices(persistence, transaction, criteria);
  const agentsByOfficeIndex = transaction.stores[Agent.STORE].index('agents-office');

  const searchMatches = await Promise.all(
    matches.map(
      (office) =>
        new Promise<OfficesSearchResultsType>((resolve) => {
          let count = 0;
          const cursorRequest = agentsByOfficeIndex.openKeyCursor(IDBKeyRange.only([office.id]));
          cursorRequest.onsuccess = () => {
            const cursor = cursorRequest.result;
            if (cursor) {
              count++;
              cursor.continue();
            } else {
              resolve({
                ...office,
                agentsCount: count,
              });
            }
          };
        })
    )
  );

  transaction.complete();
  return searchMatches;
};
