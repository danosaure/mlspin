import { useState } from 'react';
import Alert from '@mui/material/Alert';

import searchZipLookup, { ZipLookupSearchType } from '../../search/zip-lookup';
import MainPanel from '../main-panel';

import ZipLookupSearchForm from './search-form';
import { ZipLookupType } from '../../models/zip-lookup';
import ZipLookupSearchResults from './search-results';

export default () => {
  const [data, setData] = useState<ZipLookupType[] | null>(null);

  const onSubmit = async (criteria: ZipLookupSearchType): Promise<void> => {
    const matches: ZipLookupType[] = await searchZipLookup(criteria);
    setData(matches);
  };

  let dataTable = null;
  if (data) {
    dataTable = data.length ? (
      <ZipLookupSearchResults data={data} />
    ) : (
      <Alert variant="outlined" severity="warning">
        No results
      </Alert>
    );
  }

  return (
    <MainPanel className="dano-zip-lookup-panel" title="Zip Lookup">
      <MainPanel.Section>
        <ZipLookupSearchForm onSubmit={onSubmit} />
      </MainPanel.Section>

      <MainPanel.Section>{dataTable}</MainPanel.Section>
    </MainPanel>
  );
};
