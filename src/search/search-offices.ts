import { OfficeType, ZipLookupType } from '../models/types';
import { searchZipLookupByCityOrZip } from './search-zip-lookup-by-city-or-zip';
import searchOfficesByName from './search-offices-by-name';
import countAgentsByOfficeId from './count-agents-by-office-id';
import { PersistenceTransaction } from '../persistence/transaction';
import { OfficeSearchResultType, OfficeSearchType } from './types';

/**
 *
 * @param param0
 * @param transaction The transaction must contain at least `AgentOfficeRole.STORE`, `Office.STORE`, and `ZipLookup.STORE`
 * @returns
 */
export const searchOffices = async (
  { name, city, zip }: OfficeSearchType,
  transaction: PersistenceTransaction
): Promise<OfficeSearchResultType[]> => {
  // const transaction = await persistence.transaction([AgentOfficeRole.STORE, Office.STORE, ZipLookup.STORE], 'readonly');

  const zipLookups: Record<string, ZipLookupType> = await searchZipLookupByCityOrZip(city, zip, transaction);
  const offices: Record<string, OfficeType> = await searchOfficesByName(name, transaction);

  const matchingOffices: Record<string, OfficeType> = Object.values(offices).reduce(
    (matches, office) => (zipLookups[office.zip] ? { ...matches, [office.id]: office } : matches),
    {} as Record<string, OfficeType>
  );

  const agentsByOffices: Record<string, number>[] = await Promise.all(
    Object.values(matchingOffices).map((office) => countAgentsByOfficeId(office.id, transaction))
  );

  const agentsByOfficesMap = agentsByOffices.reduce((map, agentsInOffice) => ({ ...map, ...agentsInOffice }));

  return Object.values(matchingOffices).map((office) => ({
    id: office.id,
    name: office.name,
    address: office.address,
    city: zipLookups[office.zip]?.city || '',
    zip: office.zip,
    agentsCount: agentsByOfficesMap[office.id],
  }));
};
