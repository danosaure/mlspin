import { useState } from 'react';
import { Alert } from '@mui/material';

import { searchAgents } from '../../search/search-agents';
import { MainPanel } from '../main-panel';

import { AgentsSearchForm } from './search-form';
import { AgentsSearchResults } from './search-results';
import { AgentSearchResultType, AgentSearchType } from '../../search/types';

const MLSPinAgents = () => {
  const [data, setData] = useState<AgentSearchResultType[] | null>(null);

  const onSubmit = async (criteria: AgentSearchType): Promise<void> => {
    const matches: AgentSearchResultType[] = await searchAgents(criteria);
    setData(matches);
  };

  let dataTable = null;
  if (data) {
    if (data.length) {
      dataTable = <AgentsSearchResults data={data} />;
    } else {
      dataTable = (
        <Alert variant="outlined" severity="warning">
          No results
        </Alert>
      );
    }
  }

  return (
    <MainPanel className="dano-agents-panel" title="Agents">
      <MainPanel.Section>
        <AgentsSearchForm onSubmit={onSubmit} />
      </MainPanel.Section>

      <MainPanel.Section>{dataTable}</MainPanel.Section>
    </MainPanel>
  );
};

MLSPinAgents.displayName = 'MLSPinAgents';

export { MLSPinAgents };
