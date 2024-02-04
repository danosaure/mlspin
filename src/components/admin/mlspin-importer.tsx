import { useContext } from 'react';

import { importMLS } from '../../import';
import MainPanel from '../main-panel';
import GenericImporterForm from './generic-importer-form';
import { SnackbarsContext } from '../snackbars-context';

export default () => {
  const { addMessage } = useContext(SnackbarsContext);

  const saveContent = async (content: string) => {
    addMessage({ severity: 'warning', message: 'Import in progress...' });

    try {
      await importMLS(content);
      addMessage({ severity: 'success', message: 'Data imported successfully.' });
    } catch (e) {
      addMessage({ severity: 'error', message: e instanceof Error ? e.message : String(e) });
    }
  };

  return (
    <MainPanel className="dano--importer" title="Data importer">
      <GenericImporterForm
        className="dano--importer--form"
        saveContent={saveContent}
        placeholder="Paste in the output from the bookmarklet."
      />
    </MainPanel>
  );
};
