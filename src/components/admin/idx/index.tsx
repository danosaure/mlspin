import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import namespace from './namespace';
import { updateUploadedDate } from './update-uploaded-date';
import { useSnackbars } from '../../snackbars';
import { displayName } from '../../../utils';
import { IDXFileUploaderButton } from '../../idx-file-uploader-button';
import type { UploadedIDXFileType } from '../../idx-file-uploader-button';
import { importIDXReference } from '../../../import/idx';
import { useRecoilState } from 'recoil';
import { lastUploadedByFilenameState } from '../../../states';
import { useEffect } from 'react';

const AdminIDX = () => {
  const [uploadedCountiesDate, setUploadedCountiesDate] = useRecoilState(lastUploadedByFilenameState('counties.txt'));
  const [uploadedAreasDate, setUploadedAreasDate] = useRecoilState(lastUploadedByFilenameState('areas.txt'));
  const [uploadedTownsDate, setUploadedTownsDate] = useRecoilState(lastUploadedByFilenameState('towns.txt'));
  const [uploadedFieldReferenceDate, setUploadedFieldReferenceDate] = useRecoilState(
    lastUploadedByFilenameState('field_reference.txt')
  );
  const [uploadedSFDate, setUploadedSFDate] = useRecoilState(lastUploadedByFilenameState('idx_sf.txt'));
  const [uploadedSFSoldDate, setUploadedSFSoldDate] = useRecoilState(lastUploadedByFilenameState('idx_sf_sld.txt'));
  const [uploadedCCDate, setUploadedCCDate] = useRecoilState(lastUploadedByFilenameState('idx_cc.txt'));
  const [uploadedCCSoldDate, setUploadedCCSoldDate] = useRecoilState(lastUploadedByFilenameState('idx_cc_sld.txt'));

  const { setSnack } = useSnackbars();

  const onIDXFileLoaded = async (result: UploadedIDXFileType) => {
    setSnack('warning', 'Loading IDX file...');
    // TODO Import data of file.
    console.log('idx file=', result);
    setSnack('success', 'IDX file uploaded');
  };

  const onReferenceTableLoaded = async (result: UploadedIDXFileType) => {
    setSnack('warning', 'Loading Reference Table...');
    await importIDXReference(result.name, result.content);
    setSnack('success', 'Reference Table uploaded');
  };

  useEffect(() => {
    updateUploadedDate('counties.txt', uploadedCountiesDate, setUploadedCountiesDate);
  }, [uploadedCountiesDate]);

  useEffect(() => {
    updateUploadedDate('areas.txt', uploadedAreasDate, setUploadedAreasDate);
  }, [uploadedAreasDate]);

  useEffect(() => {
    updateUploadedDate('towns.txt', uploadedTownsDate, setUploadedTownsDate);
  }, [uploadedTownsDate]);

  useEffect(() => {
    updateUploadedDate('field_reference.txt', uploadedFieldReferenceDate, setUploadedFieldReferenceDate);
  }, [uploadedFieldReferenceDate]);

  useEffect(() => {
    updateUploadedDate('idx_sf_sld.txt', uploadedSFSoldDate, setUploadedSFSoldDate);
  }, [uploadedSFSoldDate]);

  useEffect(() => {
    updateUploadedDate('idx_sf.txt', uploadedSFDate, setUploadedSFDate);
  }, [uploadedSFDate]);

  useEffect(() => {
    updateUploadedDate('idx_cc.txt', uploadedCCDate, setUploadedCCDate);
  }, [uploadedCCDate]);

  useEffect(() => {
    updateUploadedDate('idx_cc_sld.txt', uploadedCCSoldDate, setUploadedCCSoldDate);
  }, [uploadedCCSoldDate]);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell size="small">
              <div>Internet Data Exchange files</div>
              <ul>
                <li>Single Family(idx_sf.txt): {uploadedSFDate}</li>
                <li>Condo (idx_cc.txt): {uploadedCCDate}</li>
                <li>Single Family Sold (idx_sf_sld.txt): {uploadedSFSoldDate}</li>
                <li>Condo Sold (idx_cc_sld.txt): {uploadedCCSoldDate}</li>
              </ul>
            </TableCell>
            <TableCell>
              <IDXFileUploaderButton label="Upload IDX file" onloadend={onIDXFileLoaded} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell size="small">
              <div>Reference Tables:</div>
              <ul>
                <li>Counties: {uploadedCountiesDate}</li>
                <li>Towns: {uploadedAreasDate}</li>
                <li>Areas: {uploadedTownsDate}</li>
                <li>Field Reference: {uploadedFieldReferenceDate}</li>
              </ul>
            </TableCell>
            <TableCell>
              <IDXFileUploaderButton label="Upload Reference Table" onloadend={onReferenceTableLoaded} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AdminIDX.displayName = displayName(namespace('AdminIDX'));

export { AdminIDX };
