import { useState } from 'react';

import { AlertColor } from '@mui/material/Alert';

import { importMLS } from '../../import';
import MainPanel from '../main-panel';
import Snackbars from '../snackbars';
import GenericImporterForm from './generic-importer-form';

type MLSPinImporterSnackType = {
  severity: AlertColor;
  message: string;
};

export default () => {
  const [snackMessages, setSnackMessages] = useState<MLSPinImporterSnackType[]>([]);

  const snackbarClosed = () => setSnackMessages([]);

  const saveContent = async (content: string) => {
    setSnackMessages(snackMessages.concat({ severity: 'warning', message: 'Import in progress...' }));

    try {
      await importMLS(content);
      setSnackMessages(snackMessages.concat({ severity: 'success', message: 'Data imported successfully.' }));
    } catch (e) {
      setSnackMessages(snackMessages.concat({ severity: 'error', message: e instanceof Error ? e.message : String(e) }));
    }
  };

  return (
    <MainPanel className="dano--importer" title="Data importer">
      <GenericImporterForm
        className="dano--importer--form"
        saveContent={saveContent}
        placeholder="Paste in the output from the bookmarklet."
      />

      <Snackbars snackbarClosed={snackbarClosed} snacks={snackMessages} />
    </MainPanel>
  );
};
