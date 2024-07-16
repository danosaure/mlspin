import { IDXFieldReference, IDXReferenceArea, IDXReferenceCounty, IDXReferenceTown } from '../../models';
import Persistence from '../../persistence';
import { CSVParsedType } from '../../utils/csv-parsed-type';

const importIDXReference = async (filename: string, content: CSVParsedType[]): Promise<void> => {
  let Model: typeof IDXReferenceArea | typeof IDXReferenceCounty | typeof IDXReferenceTown | typeof IDXFieldReference;

  if (filename === 'areas.txt') {
    Model = IDXReferenceArea;
  } else if (filename === 'counties.txt') {
    Model = IDXReferenceCounty;
  } else if (filename === 'towns.txt') {
    Model = IDXReferenceTown;
  } else if (filename === 'field_reference.txt') {
    Model = IDXFieldReference;
  } else {
    throw new Error(`Unsupported filename: ${filename}`);
  }

  const persistence = new Persistence();
  await persistence.open();

  const transaction = await persistence.transaction([Model.STORE], 'readwrite');
  const objectStore = transaction.stores[Model.STORE];
  const clearRequest = objectStore.clear();
  clearRequest.onsuccess = () => {
    let remainingItems = content.length;
    content.forEach((entry: CSVParsedType) => {
      const addRequest = objectStore.add(entry);
      addRequest.onsuccess = () => {
        remainingItems--;
        if (remainingItems === 0) {
          transaction.complete();
        }
      };

      addRequest.onerror = () => {
        console.error(`[import-idx-reference] addRequest.onerror() with entry=`, entry, addRequest.error);
      };
    });
  };
};

export { importIDXReference };
