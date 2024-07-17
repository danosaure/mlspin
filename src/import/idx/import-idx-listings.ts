import { IDXListing } from '../../models';
import Persistence from '../../persistence';
import { putManyRaw } from '../../persistence/put-many-raw';
import { CSVParsedType } from '../../utils/csv-parsed-type';

const importIDXListings = async (filename: string, content: CSVParsedType[]): Promise<void> => {
  const persistence = new Persistence();
  await persistence.open();
  const transaction = await persistence.transaction([IDXListing.STORE], 'readwrite');
  const objectStore = transaction.stores[IDXListing.STORE];

  // TODO: Remove old data

  console.log(`importIDXData(): filename=${filename}; content=(${content.length})`, content);

  // TODO: Filter for existing agents and offices only.

  // This filters out an incomplete file with the error at the bottom:
  //    <font face="Arial" size=2>
  //      <p>Active Server Pages</font> <font face="Arial" size=2>error 'ASP 0113'</font>
  //      <p>
  //      <font face="Arial" size=2>Script timed out</font>
  //      <p>
  //      <font face="Arial" size=2>/idx.asp</font>
  //      <p>
  //      <font face="Arial" size=2>The maximum amount of time for a script to execute was exceeded. You can change this limit by specifying a new value for the property Server.ScriptTimeout or by changing the value in the IIS administration tools.
  //      </font>
  const nonEmptyContent: CSVParsedType[] = content.filter((item: CSVParsedType) => item.PROP_TYPE && item.STATUS);

  await putManyRaw(objectStore, nonEmptyContent);

  transaction.complete();
};

export { importIDXListings };
