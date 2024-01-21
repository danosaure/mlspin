export const generateTabId = (tabId: string): string => `da--tab--${tabId}`;

export const generateTabPanelId = (tabId: string): string => `da--tabpanel--${tabId}`;

export const a11yProps = (tabId: string): Record<string, string> => ({
  'aria-controls': generateTabPanelId(tabId),
  iconPosition: 'start',
  value: tabId,
});
