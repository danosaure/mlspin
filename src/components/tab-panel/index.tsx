import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { generateTabId, generateTabPanelId } from '../main/utils';
import { displayName } from '../../utils';
import namespace from './namespace';

interface TabPanelProps {
  children?: ReactNode;
  selectedTabId: string;
  tabId: string;
}

const TabPanel = ({ tabId, selectedTabId, children }: TabPanelProps) => (
  <div
    role="tabpanel"
    className="dano--tab-panel"
    hidden={tabId !== selectedTabId}
    id={generateTabPanelId(tabId)}
    aria-labelledby={generateTabId(tabId)}
  >
    {tabId === selectedTabId && (
      <Box className="dano--tab-panel--content" sx={{ p: 3 }}>
        {children}
      </Box>
    )}
  </div>
);

TabPanel.displayName = displayName(namespace('TabPanel'));

export { TabPanel };
