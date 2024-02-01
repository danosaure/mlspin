import { Office, ZipLookup } from '../models';
import AgentOfficeRole from '../models/agent-office-role';
import Persistence from '../persistence';
import { searchOffices } from './search-offices';
import { OfficeSearchResultType, OfficeSearchType } from './types';

export const searchOfficesFromForm = async (criteria: OfficeSearchType): Promise<OfficeSearchResultType[]> => {
  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction([AgentOfficeRole.STORE, Office.STORE, ZipLookup.STORE]);

  try {
    return await searchOffices(criteria, transaction);
  } finally {
    transaction.complete();
    persistence.close();
  }
};
