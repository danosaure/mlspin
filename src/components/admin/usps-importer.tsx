import { useState } from 'react';

import { importUSPS } from '../../import';
import MainPanel from '../main-panel';
import Snackbars, { MLSPinSnackbarsType } from '../snackbars';

import GenericImporterForm from './generic-importer-form';

export default () => {
  const [snackMessages, setSnackMessages] = useState<MLSPinSnackbarsType[]>([]);

  const snackbarClosed = () => setSnackMessages([]);

  const saveContent = async (content: string) => {
    setSnackMessages(snackMessages.concat({ severity: 'warning', message: 'Import in progress...' }));

    try {
      await importUSPS(content);
      setSnackMessages(snackMessages.concat({ severity: 'success', message: 'Data imported successfully.' }));
    } catch (e) {
      setSnackMessages(snackMessages.concat({ severity: 'error', message: e instanceof Error ? e.message : String(e) }));
    }
  };

  return (
    <MainPanel className="dano--usps-importer" title="USPS Data importer">
      <GenericImporterForm
        className="dano--usps-importer--form"
        saveContent={saveContent}
        placeholder="Paste in the USPS CSV file."
      />
      <Snackbars className="dano--usps-importer--snackbar" snackbarClosed={snackbarClosed} snacks={snackMessages} />
    </MainPanel>
  );
};
