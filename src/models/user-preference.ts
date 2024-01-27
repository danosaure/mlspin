import Persistence from '../persistence';
import Base, { PersistenceBaseType, PersistenceHistoryType } from './base';

export type UserPreferenceType = PersistenceBaseType & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

class UserPreference extends Base {
  static readonly STORE = 'user-preferences';

  constructor(data: UserPreferenceType) {
    super(data);
  }

  static async getTheme() {
    const persistence = new Persistence();
    await persistence.open();

    const transaction = await persistence.transaction(UserPreference.STORE);

    return new Promise<string>(async (resolve) => {
      const getRequest = transaction.stores[UserPreference.STORE].get('theme');
      getRequest.onsuccess = () => {
        const result = getRequest.result;
        resolve(result ? result.value : 'dark');
        transaction.complete();
        persistence.close();
      };

      getRequest.onerror = () => resolve('dark');
    });
  }

  static async setTheme(theme: string): Promise<void> {
    const persistence = new Persistence();
    await persistence.open();

    const transaction = await persistence.transaction(UserPreference.STORE, 'readwrite');
    const userPreference: UserPreferenceType = {
      id: 'theme',
      value: theme,
    };
    const newHistory: PersistenceHistoryType = {
      date: new Date(),
      action: 'user',
      message: `Changed theme to "${theme}".`,
    };
    await persistence.put(transaction.stores[UserPreference.STORE], userPreference, newHistory);
  }
}

export default UserPreference;
