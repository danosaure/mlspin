import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import Persistence from '../../../persistence';
import downloadFile from '../../../utils/download-file';
import { JsonFileUploaderButton, UploadedJsonFileType } from '../../json-file-uploader-button';
import { updateUspsData } from '../../../import/update-usps-data';
import { useSnackbars } from '../../snackbars';
import { displayName } from '../../../utils';
import namespace from './namespace';

const AdminBackups = () => {
  const { setSnack } = useSnackbars();

  const createBackup = async (): Promise<void> => {
    setSnack('warning', 'Generating backup file...');
    const content = await Persistence.createBackup();

    setSnack('succes', 'Backup file ready to be downloaded.');
    await downloadFile(content, 'db-backup');
  };

  const onloadend = async (result: UploadedJsonFileType) => {
    setSnack('warning', 'Loading backup file to restore...');
    const persistence = new Persistence();
    await persistence.restoreBackup(result);
    setSnack('success', 'Backup file restored.');
  };

  const onerror = (message: string) => {
    // eslint-disable-next-line no-console
    console.error('admin.backups(): onerror():', message);
  };

  const updateUSPS = async (): Promise<void> => {
    setSnack('warning', 'Loading USPS data...');

    try {
      await updateUspsData();
      setSnack('success', 'USPS data loaded.');
    } catch (e) {
      setSnack('error', `ERR loading USPS data: ${e instanceof Error ? e.message : e}`);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="small">
              This allows you to create a backup copy of all the data in the database. This can be used to restore on another
              system.
            </TableCell>
            <TableCell>
              <Button variant="contained" onClick={createBackup}>
                Create a backup
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size="small">
              Restore the data from a backup. All the current information in the database will be removed. You should make a backup
              of the current data with the `Create a backup` function above first. There is no way to undo a restore, beside
              restoring from another backup.
            </TableCell>
            <TableCell>
              <JsonFileUploaderButton label="Restore from backup" onloadend={onloadend} onerror={onerror} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size="small">Update the USPS data. This needs to be run at least once.</TableCell>
            <TableCell>
              <Button variant="contained" onClick={updateUSPS}>
                Update USPS data
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AdminBackups.displayName = displayName(namespace('AdminBackups'));

export { AdminBackups };
