import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import namespace from './namespace';
import { useSnackbars } from '../../snackbars';
import { displayName } from '../../../utils';
import { IDXFileUploaderButton } from '../../idx-file-uploader-button';
import type { UploadedIDXFileType } from '../../idx-file-uploader-button';

const AdminIDX = () => {
  const { setSnack } = useSnackbars();

  const onIDXFileLoaded = async (result: UploadedIDXFileType) => {
    setSnack('warning', 'Loading IDX file...');
    // TODO Import data of file.
    console.log('idx file=', result);
    setSnack('success', 'IDX file uploaded');
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="small">Internet Data Exchange files</TableCell>
            <TableCell>
              <IDXFileUploaderButton label="Upload IDX file" onloadend={onIDXFileLoaded} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AdminIDX.displayName = displayName(namespace('AdminIDX'));

export { AdminIDX };
