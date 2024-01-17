import Persistence from '../persistence';
import Office, { OfficeSearchType } from '../models/office';
import OfficeType from '../types/office';

const matchOffice = ({ name, city, zip }: OfficeSearchType, [keyName, keyCity, keyZip]: string[]): boolean => {
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

  const matchCity = city ? keyCity.toLocaleLowerCase().indexOf(city.toLocaleLowerCase()) !== -1 : true;
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
  store: IDBObjectStore,
  criteria: OfficeSearchType
): Promise<OfficeType[]> =>
  new Promise((resolve) => {
    const matches: OfficeType[] = [];

    persistence.openCursor(
      store.index(Office.SEARCH_INDEX),
      (cursor) => {
        if (matchOffice(criteria, cursor.key as string[])) {
          // if (Office.match({ name, city, zip }, cursor.value)) {
          matches.push(cursor.value);
        }
        cursor.continue();
      },
      () => {
        resolve(matches.sort((a, b) => a.name.localeCompare(b.name)));
      }
    );
  });

export default async (criteria: OfficeSearchType): Promise<OfficeType[]> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction(Office.STORE, 'readonly');

  const matches = await searchOffices(persistence, transaction.stores[Office.STORE], criteria);

  transaction.complete();
  return matches;
};
