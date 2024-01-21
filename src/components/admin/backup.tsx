import { Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import Persistence from '../../persistence';
import downloadFile from '../../utils/download-file';

export default () => {
  const createBackup = async (): Promise<void> => {
    const persistence = new Persistence();
    const content = await persistence.createBackup();
    await downloadFile(content, 'db-backup');
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
        </TableBody>
      </Table>
    </TableContainer>
  );
};
