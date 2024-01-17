import { useState, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TabPanel from '../tab-panel';
import { a11yProps } from './utils';

import Agents from '../agents';
import Offices from '../offices';
import Importer from '../importer';

export default () => {
  const [tabId, setTabId] = useState(0);

  const changeTab = (event: SyntheticEvent, newTabId: number) => setTabId(newTabId);

  return (
    <Box component="main" className="dano-main">
      <Tabs className="dano-tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
        <Tab className="dano-tabs-item" label="Agents" {...a11yProps(0)} />
        <Tab className="dano-tabs-item" label="Offices" {...a11yProps(1)} />
        <Tab className="dano-tabs-item dano-tabs-divider" label="" disabled /> {/* counted as 2 */}
        <Tab className="dano-tabs-item" label="Import" {...a11yProps(3)} />
      </Tabs>

      <TabPanel tabId={0} selectedTabId={tabId}>
        <Agents />
      </TabPanel>

      <TabPanel tabId={1} selectedTabId={tabId}>
        <Offices />
      </TabPanel>

      <TabPanel tabId={3} selectedTabId={tabId}>
        <Importer />
      </TabPanel>
    </Box>
  );
};
