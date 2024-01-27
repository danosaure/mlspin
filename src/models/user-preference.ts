import Persistence from '../persistence';
import Base, { PersistenceBaseType } from './base';

export type UserPreferencesType = PersistenceBaseType & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
};

class UserPreference extends Base {
  static readonly STORE = 'user-preferences';

  constructor(data: UserPreferencesType) {
    super(data);
  }

  static async getTheme(): Promise<string> {
    const persistence = new Persistence();
    await persistence.open();

    const transaction = await persistence.transaction(UserPreference.STORE);

    return new Promise<string>(async (resolve) => {
      const getRequest = transaction.stores[UserPreference.STORE].get('theme');
      getRequest.onerror = () => {
        const result = getRequest.result;
        console.log('result=', result);
        resolve('dark');
      };

      getRequest.onerror = () => {
        console.log('*** ERROR ***');
      };
    });
  }
}

export default UserPreference;
