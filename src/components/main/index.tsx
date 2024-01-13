import { useState, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TabPanel from './tab-panel';
import { a11yProps } from './utils';
import Offices from '../offices';

export default () => {
  const [tabId, setTabId] = useState(0);

  const changeTab = (event: SyntheticEvent, newTabId: number) => setTabId(newTabId);

  return (
    <Box component="main" className="dano-main">
      <Tabs className="dano-tabs" orientation="vertical" value={tabId} onChange={changeTab} aria-label="Navigation tabs">
        <Tab className="dano-tabs-item" label="Agents" {...a11yProps(0)} />
        <Tab className="dano-tabs-item" label="Offices" {...a11yProps(1)} />
      </Tabs>

      <TabPanel tabId={0} selectedTabId={tabId}>
        agents tab
      </TabPanel>

      <TabPanel tabId={1} selectedTabId={tabId}>
        <Offices />
      </TabPanel>
    </Box>
  );
};
