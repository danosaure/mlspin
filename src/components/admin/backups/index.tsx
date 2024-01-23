import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import Persistence from '../../../persistence';
import downloadFile from '../../../utils/download-file';
import JsonFileUploaderButton, { UploadedJsonFileType } from '../../json-file-uploader-button';

export default () => {
  const createBackup = async (): Promise<void> => {
    const persistence = new Persistence();
    const content = await persistence.createBackup();
    await downloadFile(content, 'db-backup');
  };

  const onloadend = async (result: UploadedJsonFileType) => {
    // TODO: indicator restore in progress
    const persistence = new Persistence();
    await persistence.restoreBackup(result);
  };

  const onerror = (message: string) => {
    console.error('admin.backups(): onerror():', message);
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};
