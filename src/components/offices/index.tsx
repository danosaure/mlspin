import { useState } from 'react';
import { Alert } from '@mui/material';

import MainPanel from '../main-panel';
import searchOffices, { OfficesSearchResultsType } from '../../search/offices';
import OfficeType from '../../types/office';

import OfficesSearchForm from './search-form';
import OfficesSearchResults from './search-results';

export default () => {
  const [data, setData] = useState<OfficesSearchResultsType[] | null>(null);

  const onSubmit = async (criteria: Record<string, string>): Promise<void> => {
    const matches = await searchOffices(criteria);
    setData(matches);
  };

  let dataTable = null;
  if (data) {
    if (data.length) {
      dataTable = <OfficesSearchResults data={data} />;
    } else {
      dataTable = (
        <Alert variant="outlined" severity="warning">
          No results
        </Alert>
      );
    }
  }

  return (
    <MainPanel className="dano-offices-panel" title="Offices">
      <MainPanel.Section>
        <OfficesSearchForm onSubmit={onSubmit} />
      </MainPanel.Section>

      <MainPanel.Section>{dataTable}</MainPanel.Section>
    </MainPanel>
  );
};
