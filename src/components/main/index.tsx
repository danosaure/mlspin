import { useState, SyntheticEvent } from 'react';
import {
  Business as BusinessIcon,
  ImportExport as ImportExportIcon,
  Map as MapIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';

import Agents from '../agents';
import Importers from '../importers';
import Offices from '../offices';
import TabPanel from '../tab-panel';
import ZipLookup from '../zip-lookup';

import { a11yProps } from './utils';

export default () => {
  const [tabId, setTabId] = useState(0);

  const changeTab = (event: SyntheticEvent, newTabId: number) => setTabId(newTabId);

  return (
    <Box component="main" className="dano-main">
      <Tabs className="dano-tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
        <Tab className="dano-tabs-item" label="Agents" {...a11yProps(0)} icon={<PersonIcon />} />
        <Tab className="dano-tabs-item" label="Offices" {...a11yProps(1)} icon={<BusinessIcon />} />
        <Tab className="dano-tabs-item dano-tabs-divider" label="" disabled /> {/* counted as 2 */}
        <Tab className="dano-tabs-item" label="Zip lookup" {...a11yProps(3)} icon={<MapIcon />} />
        <Tab className="dano-tabs-item" label="Imports" {...a11yProps(4)} icon={<ImportExportIcon />} />
      </Tabs>

      <TabPanel tabId={0} selectedTabId={tabId}>
        <Agents />
      </TabPanel>

      <TabPanel tabId={1} selectedTabId={tabId}>
        <Offices />
      </TabPanel>

      <TabPanel tabId={3} selectedTabId={tabId}>
        <ZipLookup />
      </TabPanel>

      <TabPanel tabId={4} selectedTabId={tabId}>
        <Importers />
      </TabPanel>
    </Box>
  );
};
