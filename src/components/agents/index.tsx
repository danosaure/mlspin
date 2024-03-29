import { Alert } from '@mui/material';

import { searchAgents } from '../../search/search-agents';
import { MainPanel } from '../main-panel';

import { AgentsSearchForm } from './search-form';
import { AgentsSearchResults } from './search-results';
import { AgentSearchResultType, AgentSearchType } from '../../search/types';
import { displayName } from '../../utils';
import namespace from './namespace';
import { atom, useRecoilState } from 'recoil';

const MLSPinAgents = () => {
  const [data, setData] = useRecoilState(agentsSearchDataState);

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

MLSPinAgents.displayName = displayName(namespace('MLSPinAgents'));

const agentsSearchDataState = atom<AgentSearchResultType[] | null>({
  key: `${MLSPinAgents.displayName}--data`,
  default: null,
});

export { MLSPinAgents };
