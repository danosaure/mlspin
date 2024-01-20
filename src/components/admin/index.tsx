import { ImportExport as ImportExportIcon, Map as MapIcon } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

import MLSPinImporter from './mlspin-importer';
import ZipLookup from './zip-lookup';
import { a11yProps } from '../main/utils';
import TabPanel from '../tab-panel';

export default () => {
  const [tabId, setTabId] = useState(0);

  const changeTab = (event: SyntheticEvent, newTabId: number) => setTabId(newTabId);

  return (
    <Box component="main" className="dano-admin">
      <Stack direction="row" spacing={10}>
        <Typography variant="h2" component="div">
          Admin
        </Typography>
        <Tabs className="dano-admin-tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
          <Tab className="dano-admin-tabs-item" label="Agents & Offices" {...a11yProps(0)} icon={<ImportExportIcon />} />
          <Tab className="dano-admin-tabs-item" label="Zip" {...a11yProps(1)} icon={<MapIcon />} />
        </Tabs>
      </Stack>

      <TabPanel tabId={0} selectedTabId={tabId}>
        <MLSPinImporter />
      </TabPanel>

      <TabPanel tabId={1} selectedTabId={tabId}>
        <ZipLookup />
      </TabPanel>
    </Box>
  );
};
