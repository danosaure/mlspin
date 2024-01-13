import { ReactNode } from 'react';
import Box from '@mui/material/Box';

import { generateTabId, generateTabPanelId } from './utils';

interface TabPanelProps {
  children?: ReactNode;
  selectedTabId: number;
  tabId: number;
}

export default (props: TabPanelProps) => (
  <div
    role="tabpanel"
    className="dano-tabpanel"
    hidden={props.tabId !== props.selectedTabId}
    id={generateTabPanelId(props.tabId)}
    aria-labelledby={generateTabId(props.tabId)}
  >
    {props.tabId === props.selectedTabId && <Box sx={{ p: 3 }}>{props.children}</Box>}
  </div>
);
