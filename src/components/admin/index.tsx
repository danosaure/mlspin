import { ImportExport as ImportExportIcon, Map as MapIcon } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

import MLSPinImporter from './mlspin-importer';
import ZipLookup from './zip-lookup';
import { a11yProps } from '../main/utils';
import TabPanel from '../tab-panel';

export default () => {
  const [tabId, setTabId] = useState('mls');

  const changeTab = (event: SyntheticEvent, newTabId: string) => setTabId(newTabId);

  return (
    <Box component="main" className="dano--admin">
      <Stack direction="row" spacing={10}>
        <Typography variant="h2" component="div">
          Admin
        </Typography>
        <Tabs className="dano--admin--tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
          <Tab className="dano--admin--tabs--item" label="MLSpin" {...a11yProps('mls')} icon={<ImportExportIcon />} />
          <Tab className="dano--admin--tabs--item" label="Zip" {...a11yProps('zip')} icon={<MapIcon />} />
        </Tabs>
      </Stack>

      <TabPanel tabId="mls" selectedTabId={tabId}>
        <MLSPinImporter />
      </TabPanel>

      <TabPanel tabId="zip" selectedTabId={tabId}>
        <ZipLookup />
      </TabPanel>
    </Box>
  );
};
