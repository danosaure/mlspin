import { importMLS } from '../../import';
import { MainPanel } from '../main-panel';
import { useSnackbars } from '../snackbars';
import { AdminGenericImporterForm } from './generic-importer-form';

const MLSPinImporter = () => {
  const { setSnack } = useSnackbars();

  const saveContent = async (content: string) => {
    setSnack('warning', 'Import in progress...');

    try {
      await importMLS(content);
      setSnack('success', 'Data imported successfully.');
    } catch (e) {
      setSnack('error', e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <MainPanel className="dano--importer" title="Data importer">
      <AdminGenericImporterForm
        className="dano--importer--form"
        saveContent={saveContent}
        placeholder="Paste in the output from the bookmarklet."
      />
    </MainPanel>
  );
};

MLSPinImporter.displayName = 'MLSPinImporter';

export { MLSPinImporter };
