import { useEffect, useState } from 'react';
import { Alert, CircularProgress, Stack, Typography } from '@mui/material';

import { AdminZipLookupSearchResults, ZipLookupSearchResultsType } from './search-results';
import { MainPanel } from '../../main-panel';
import ZipLookup from '../../../models/zip-lookup';
import { ZipLookupType } from '../../../models/types';
import { searchZipLookup } from '../../../search/search-zip-lookups';

const AdminZipLookup = () => {
  const [data, setData] = useState<Record<string, ZipLookupType>>({});

  const save = async (id: string, neighborhoods: string[]) => {
    await ZipLookup.updateNeighborhoods(id, neighborhoods);
  };

  let content = (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
      <CircularProgress className="dano-zip-loopup-panel--progress" />
      <Typography>Loading data...</Typography>
    </Stack>
  );

  if (data) {
    if (Object.values(data).length) {
      const searchResultData: ZipLookupSearchResultsType[] = Object.values(data).map((zipLookup: ZipLookupType) => ({
        id: zipLookup.id,
        city: zipLookup.city,
        neighborhoods: zipLookup.neighborhoods,
        save: async (neighborhoods: string[]): Promise<void> => save(zipLookup.id, neighborhoods),
      }));

      content = <AdminZipLookupSearchResults data={searchResultData} />;
    } else {
      content = (
        <Alert variant="outlined" severity="warning">
          No data available
        </Alert>
      );
    }
  }

  useEffect(() => {
    (async () => {
      const matches: Record<string, ZipLookupType> = await searchZipLookup();
      setData(matches);
    })();
  }, []);

  return (
    <MainPanel className="dano-zip-lookup-panel" title="Zip Lookup">
      <MainPanel.Section>{content}</MainPanel.Section>
    </MainPanel>
  );
};

AdminZipLookup.displayName = 'AdminZipLookup';

export { AdminZipLookup };
