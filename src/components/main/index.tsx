import { useState, SyntheticEvent } from 'react';

import BusinessIcon from '@mui/icons-material/Business';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TabPanel from '../tab-panel';
import { a11yProps } from './utils';

import Agents from '../agents';
import Offices from '../offices';
import Importers from '../importers';

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
        Zip form
      </TabPanel>

      <TabPanel tabId={4} selectedTabId={tabId}>
        <Importers />
      </TabPanel>
    </Box>
  );
};
