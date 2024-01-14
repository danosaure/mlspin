import Persistence from '../persistence';
import PersistenceType from '../types/persistence';
import { DB_NAME, DB_VERSION } from '../persistence/constants';
import Office from '../models/office';
import Agent from '../models/agent';


import parse from './office-results-parser';
import { store } from '../store';

export default async (content: string): Promise<void> => {
    const data = parse(content);

    console.log('data=', data);

    let persistence: any;
    try {
        persistence = new Persistence(PersistenceType.IndexedDB, DB_NAME, DB_VERSION);
        await persistence.open();

        [[Office.STORE, data.offices], [Agent.STORE, data.agents]].forEach(async ([storeName, items]): Promise<void> => {
            const transaction: IDBTransaction | undefined = persistence.transaction(storeName, 'readwrite');
            if (transaction) {
                const objectStore: IDBObjectStore = transaction.objectStore(storeName as string);
                // TODO: #1 - async
                Object.values(items).forEach((item) => objectStore.put(item));
            }
        });
    } finally {
        if (persistence) {
            persistence.close();
        }
    }
};
