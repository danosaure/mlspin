import AgentOfficeRole from '../models/agent-office-role';
import { AgentOfficeRoleType } from '../models/types';
import { PersistenceTransaction } from '../persistence/transaction';

const countAgentsByOfficeId = async (officeId: string, transaction: PersistenceTransaction): Promise<Record<string, number>> =>
  new Promise<Record<string, number>>((resolve) => {
    const agentsSet = new Set();

    const agentsByOfficeIndex = transaction.stores[AgentOfficeRole.STORE].index('by-office');

    const cursorReq = agentsByOfficeIndex.openCursor(IDBKeyRange.only(officeId));

    cursorReq.onsuccess = () => {
      const cursor = cursorReq.result;
      if (cursor) {
        const agentOfficeRole: AgentOfficeRoleType = cursor.value;
        agentsSet.add(agentOfficeRole.agent);
        cursor.continue();
      } else {
        resolve({ [officeId]: agentsSet.size });
      }
    };
  });

export default countAgentsByOfficeId;
