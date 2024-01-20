import { useState, SyntheticEvent } from 'react';
import { AdminPanelSettings as AdminPanelSettingsIcon, Business as BusinessIcon, Person as PersonIcon } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';

import Admin from '../admin';
import Agents from '../agents';
import Offices from '../offices';
import TabPanel from '../tab-panel';

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
        <Tab className="dano-tabs-item" label="Admin" {...a11yProps(3)} icon={<AdminPanelSettingsIcon />} />
      </Tabs>

      <TabPanel tabId={0} selectedTabId={tabId}>
        <Agents />
      </TabPanel>

      <TabPanel tabId={1} selectedTabId={tabId}>
        <Offices />
      </TabPanel>

      <TabPanel tabId={3} selectedTabId={tabId}>
        <Admin />
      </TabPanel>
    </Box>
  );
};
