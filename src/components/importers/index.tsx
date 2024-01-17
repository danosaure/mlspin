import { useState, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import TabPanel from '../tab-panel';
import { a11yProps } from '../main/utils';

import MLSPinImporter from './mlspin-importer';

export default () => {
  const [tabId, setTabId] = useState(0);

  const changeTab = (event: SyntheticEvent, newTabId: number) => setTabId(newTabId);

  return (
    <Box component="main" className="dano-admin">
      <Tabs className="dano-admin-tabs" value={tabId} onChange={changeTab} aria-label="Navigation tabs">
        <Tab className="dano-admin-tabs-item" label="Agents & Offices" {...a11yProps(0)} />
        <Tab className="dano-admin-tabs-item" label="Zip" {...a11yProps(1)} />
      </Tabs>

      <TabPanel tabId={0} selectedTabId={tabId}>
        <MLSPinImporter />
      </TabPanel>

      <TabPanel tabId={1} selectedTabId={tabId}>
        Zip.
      </TabPanel>
    </Box>
  );
};
