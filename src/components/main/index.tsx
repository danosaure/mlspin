import { SyntheticEvent, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { AdminPanelSettings as AdminPanelSettingsIcon, Business as BusinessIcon, Person as PersonIcon } from '@mui/icons-material';
import { Box, Tab, Tabs } from '@mui/material';

import { MLSPinAdmin } from '../admin';
import { MLSPinAgents } from '../agents';
import { Offices } from '../offices';
import { TabPanel } from '../tab-panel';

import { a11yProps } from './utils';
import { countersState } from '../../states';
import { displayName } from '../../utils';
import namespace from './namespace';
import countTotalAgents from './count-total-agents';
import countTotalOffices from './count-total-offices';

const MLSPinMain = () => {
  const [tabId, setTabId] = useRecoilState(mainTabIdState);
  const [agentsCount, setAgentsCount] = useRecoilState(countersState('agents'));
  const [officesCount, setOfficesCount] = useRecoilState(countersState('offices'));

  const changeTab = (event: SyntheticEvent, newTabId: string) => setTabId(newTabId);

  const agentsLabel = agentsCount === -1 ? 'Agents' : `Agents (${agentsCount})`;
  const officesLabel = officesCount === -1 ? 'Offices' : `Offices (${officesCount})`;

  useEffect(() => {
    if (agentsCount === -1) {
      (async () => {
        const count = await countTotalAgents();
        setAgentsCount(count);
      })();
    }

    if (officesCount === -1) {
      (async () => {
        const count = await countTotalOffices();
        setOfficesCount(count);
      })();
    }
  }, [agentsCount, officesCount]);

  return (
    <Box component="main" className="dano--main">
      <Tabs className="dano--main--tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs" variant="fullWidth">
        <Tab className="dano--main--tabs--item" label={agentsLabel} {...a11yProps('agents')} icon={<PersonIcon />} />
        <Tab className="dano--main--tabs--item" label={officesLabel} {...a11yProps('offices')} icon={<BusinessIcon />} />
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

const mainTabIdState = atom({
  key: `${MLSPinMain.displayName}--tabId`,
  default: 'agents',
});

export { MLSPinMain };
