import ZipLookup from '../../models/zip-lookup';
import Persistence, { MLSPinPersistenceError } from '../../persistence';
import { Agent, Office, USPS } from '../../models';
import parse from './office-results-parser';
import { newHistory } from '../../models/persistence-history';
import extractDataByType from './extract-data-by-type';
import EXTRACTED_DATA_TYPES from './extract-data-types';
import AgentOfficeRole from '../../models/agent-office-role';
import { AgentOfficeRoleType, AgentType, OfficeType, ZipLookupType } from '../../models/types';
import { mergeZipLookupsWithCurrent } from './merge-zip-lookups-with-current';

export default async (content: string): Promise<void> => {
  const data = parse(content);

  // Agents
  const agents = extractDataByType(data, EXTRACTED_DATA_TYPES.AGENT) as AgentType[];

  // Offices
  const offices = extractDataByType(data, EXTRACTED_DATA_TYPES.OFFICE) as OfficeType[];

  // Ziplookups
  const zipLookups = extractDataByType(data, EXTRACTED_DATA_TYPES.ZIP_LOOKUP) as ZipLookupType[];

  // AgentsOfficesRoles
  const agentsOfficesRoles = extractDataByType(data, EXTRACTED_DATA_TYPES.AGENT_OFFICE_ROLE) as AgentOfficeRoleType[];

  const history = newHistory('import', 'MLS import');

  let persistence: Persistence | undefined;

  return new Promise(async (resolve, reject) => {
    try {
      persistence = new Persistence();
      await persistence.open();

      const transaction = await persistence.transaction(
        [Office.STORE, Agent.STORE, ZipLookup.STORE, AgentOfficeRole.STORE, USPS.STORE],
        'readwrite',
        {
          onabort: () => reject(new MLSPinPersistenceError('Transaction aborted.')),
          oncomplete: () => resolve(),
        }
      );

      // store `offices`
      await persistence.putMany(transaction.stores[Office.STORE], offices, history);

      // store `agents`
      await persistence.putMany(transaction.stores[Agent.STORE], agents, history);

      // store `zips`
      const zipLookupsToPut = await mergeZipLookupsWithCurrent(persistence, transaction, zipLookups);
      await persistence.putMany(transaction.stores[ZipLookup.STORE], zipLookupsToPut, history);

      // store `agents-offices-roles`
      await persistence.putMany(transaction.stores[AgentOfficeRole.STORE], agentsOfficesRoles, history);

      transaction.complete();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown';
      reject(new MLSPinPersistenceError(`Error importing: ${message}`));
    } finally {
      if (persistence) {
        persistence.close();
      }
    }
  });
};
