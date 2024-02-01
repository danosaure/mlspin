import MigrationType from './migration-type';

const migrate: MigrationType = async (db: IDBDatabase, transaction: IDBTransaction): Promise<void> => {
  const store = db.createObjectStore('agents-offices-roles', { keyPath: ['agent', 'office', 'role'] });

  store.createIndex('by-office', 'office', { unique: false });
  store.createIndex('by-role', 'role', { unique: false });

  await new Promise<void>((resolve) => {
    const agentStore = transaction.objectStore('agents');
    const cursorReq = agentStore.openCursor();
    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor) {
        const agent = cursor.value;

        store.put({
          agent: agent.id,
          office: agent.office,
          role: agent.role,
        });

        delete agent.office;
        delete agent.role;

        cursor.update(agent);

        cursor.continue();
      } else {
        resolve();
      }
    };
  });
};

export default migrate;
