import { useState, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import MainTabPanel from './main-tab-panel';
import { a11yProps } from './utils';

import Agents from '../agents';
import Offices from '../offices';
import Importer from '../importer';

export default () => {
  const [tabId, setTabId] = useState(0);

  const changeTab = (event: SyntheticEvent, newTabId: number) => setTabId(newTabId);

  return (
    <Box component="main" className="dano-main">
      <Tabs className="dano-tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs">
        <Tab className="dano-tabs-item" label="Agents" {...a11yProps(0)} />
        <Tab className="dano-tabs-item" label="Offices" {...a11yProps(1)} />
        <Tab className="dano-tabs-item dano-tabs-divider" label="" disabled /> {/* counted as 2 */}
        <Tab className="dano-tabs-item" label="Import" {...a11yProps(3)} />
      </Tabs>

      <MainTabPanel tabId={0} selectedTabId={tabId}>
        <Agents />
      </MainTabPanel>

      <MainTabPanel tabId={1} selectedTabId={tabId}>
        <Offices />
      </MainTabPanel>

      <MainTabPanel tabId={3} selectedTabId={tabId}>
        <Importer />
      </MainTabPanel>
    </Box>
  );
};
