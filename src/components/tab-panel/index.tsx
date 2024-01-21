import { ReactNode } from 'react';
import { Box } from '@mui/material';

import { generateTabId, generateTabPanelId } from '../main/utils';

interface TabPanelProps {
  children?: ReactNode;
  selectedTabId: string;
  tabId: string;
}

export default ({ tabId, selectedTabId, children }: TabPanelProps) => (
  <div
    role="tabpanel"
    className="dano--tab-panel"
    hidden={tabId !== selectedTabId}
    id={generateTabPanelId(tabId)}
    aria-labelledby={generateTabId(tabId)}
  >
    {tabId === selectedTabId && <Box className="dano--tab-panel--content" sx={{ p: 3 }}>{children}</Box>}
  </div>
);
