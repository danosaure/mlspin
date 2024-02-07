import { Dataset as DatasetIcon, ImportExport as ImportExportIcon, Map as MapIcon } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

import { AdminBackups } from './backups';
import { MLSPinImporter } from './mlspin-importer';
import { AdminZipLookup } from './zip-lookup';
import { a11yProps } from '../main/utils';
import { TabPanel } from '../tab-panel';
import { displayName } from '../../utils';
import namespace from './namespace';

const MLSPinAdmin = () => {
  const [tabId, setTabId] = useState('zip');

  const changeTab = (event: SyntheticEvent, newTabId: string) => setTabId(newTabId);

  return (
    <Box component="main" className="dano--admin">
      <Stack direction="row" spacing={10}>
        <Typography variant="h2" component="div">
          Admin
        </Typography>
        <Tabs className="dano--admin--tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
          <Tab className="dano--admin--tabs--item" label="Zip" {...a11yProps('zip')} icon={<MapIcon />} />
          <Tab className="dano--admin--tabs--item dano--admin--tabs--divider" label="" disabled />
          <Tab className="dano--admin--tabs--item" label="MLSpin" {...a11yProps('mls')} icon={<DatasetIcon />} />
          <Tab className="dano--admin--tabs--item" label="Backups" {...a11yProps('backups')} icon={<ImportExportIcon />} />
        </Tabs>
      </Stack>

      <TabPanel tabId="mls" selectedTabId={tabId}>
        <MLSPinImporter />
      </TabPanel>

      <TabPanel tabId="zip" selectedTabId={tabId}>
        <AdminZipLookup />
      </TabPanel>

      <TabPanel tabId="backups" selectedTabId={tabId}>
        <AdminBackups />
      </TabPanel>
    </Box>
  );
};

MLSPinAdmin.displayName = displayName(namespace('MLSPinAdmin'));

export { MLSPinAdmin };
