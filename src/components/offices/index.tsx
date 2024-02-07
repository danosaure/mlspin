import { useState } from 'react';
import { Alert } from '@mui/material';

import { MainPanel } from '../main-panel';

import { OfficesSearchForm } from './search-form';
import { OfficesSearchResults } from './search-results';
import { searchOfficesFromForm } from '../../search/search-offices-from-form';
import { OfficeSearchResultType, OfficeSearchType } from '../../search/types';
import { displayName } from '../../utils';
import namespace from './namespace';

const Offices = () => {
  const [data, setData] = useState<OfficeSearchResultType[] | null>(null);

  const onSubmit = async (criteria: OfficeSearchType): Promise<void> => {
    const matches = await searchOfficesFromForm(criteria);
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

Offices.displayName = displayName(namespace('Offices'));

export { Offices };
