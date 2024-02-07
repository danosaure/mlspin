import { useState, SyntheticEvent } from 'react';
import { AdminPanelSettings as AdminPanelSettingsIcon, Business as BusinessIcon, Person as PersonIcon } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';

import { MLSPinAdmin } from '../admin';
import { MLSPinAgents } from '../agents';
import { Offices } from '../offices';
import { TabPanel } from '../tab-panel';

import { a11yProps } from './utils';
import { displayName } from '../../utils';
import namespace from './namespace';

const MLSPinMain = () => {
  const [tabId, setTabId] = useState('agents');

  const changeTab = (event: SyntheticEvent, newTabId: string) => setTabId(newTabId);

  return (
    <Box component="main" className="dano--main">
      <Tabs className="dano--main--tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
        <Tab className="dano--main--tabs--item" label="Agents" {...a11yProps('agents')} icon={<PersonIcon />} />
        <Tab className="dano--main--tabs--item" label="Offices" {...a11yProps('offices')} icon={<BusinessIcon />} />
        <Tab className="dano--main--tabs--item dano--tabs--divider" label="" disabled />
        <Tab className="dano--main--tabs--item" label="Admin" {...a11yProps('admin')} icon={<AdminPanelSettingsIcon />} />
      </Tabs>

      <TabPanel tabId="agents" selectedTabId={tabId}>
        <MLSPinAgents />
      </TabPanel>

      <TabPanel tabId="offices" selectedTabId={tabId}>
        <Offices />
      </TabPanel>

      <TabPanel tabId="admin" selectedTabId={tabId}>
        <MLSPinAdmin />
      </TabPanel>
    </Box>
  );
};

MLSPinMain.displayName = displayName(namespace('MLSPinMain'));

export { MLSPinMain };
