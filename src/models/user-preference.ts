import Persistence from '../persistence';
import Base from './base';
import { newHistory } from './persistence-history';
import { UserPreferenceType } from './types';

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

    const history = newHistory('user', `Changed theme to "${theme}".`);
    await persistence.put(transaction.stores[UserPreference.STORE], userPreference, history);
  }
}

export default UserPreference;
