import { useState } from 'react';
import Alert from '@mui/material/Alert';

import MainPanel from '../main-panel';
import Modal from '../modal';
import { ZipLookupType } from '../../models/zip-lookup';
import searchZipLookup, { ZipLookupSearchType } from '../../search/zip-lookup';

import ZipLookupSearchForm from './search-form';
import ZipLookupSearchResults, { ZipLookupSearchResultType } from './search-results';

export default () => {
  const [data, setData] = useState<ZipLookupType[] | null>(null);
  const [editData, setEditData] = useState<ZipLookupType | null>(null);

  const onSubmit = async (criteria: ZipLookupSearchType): Promise<void> => {
    const matches: ZipLookupType[] = await searchZipLookup(criteria);
    setData(matches);
  };

  const closeEditModal = () => setEditData(null);

  let dataTable = null;
  let editModal = null;

  if (data) {
    if (data.length) {
      const searchResultData: ZipLookupSearchResultType[] = data.map((row: ZipLookupType) => ({
        ...row,
        edit: () => setEditData(row),
      }));

      dataTable = <ZipLookupSearchResults data={searchResultData} />;

      if (editData) {
        editModal = (
          <Modal open tall onClose={closeEditModal} title={`Edit Zip ${editData.id}`}>
            <>Modal</>
          </Modal>
        );
      }
    } else {
      dataTable = (
        <Alert variant="outlined" severity="warning">
          No results
        </Alert>
      );
    }
  }

  return (
    <MainPanel className="dano-zip-lookup-panel" title="Zip Lookup">
      <MainPanel.Section>
        <ZipLookupSearchForm onSubmit={onSubmit} />
      </MainPanel.Section>

      <MainPanel.Section>{dataTable}</MainPanel.Section>
      {editModal}
    </MainPanel>
  );
};
