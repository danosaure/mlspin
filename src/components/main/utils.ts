export const generateTabId = (tabId: number): string => `da-tab-${tabId}`;

export const generateTabPanelId = (tabId: number): string => `da-tabpanel-${tabId}`;

export const a11yProps = (tabId: number): Record<string, string> => ({
  id: generateTabId(tabId),
  'aria-controls': generateTabPanelId(tabId),
});
