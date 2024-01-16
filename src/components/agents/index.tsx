import { useState } from 'react';
import Alert from '@mui/material/Alert';

import { AgentSearchType } from '../../models/agent';
import searchAgents, { AgentTypeSearchResult } from '../../search/agents';
import MainPanel from '../main-panel';

import AgentsSearchForm from './search-form';
import AgentsSearchResults from './search-results';

export default () => {
  const [data, setData] = useState<AgentTypeSearchResult[] | null>(null);

  const onSubmit = async (criteria: AgentSearchType): Promise<void> => {
    const matches: AgentTypeSearchResult[] = await searchAgents(criteria);
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
