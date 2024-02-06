import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AgentsSearchResultsRole } from './search-results--role';
import { SearchResults } from '../search-results';
import { AgentRoleType } from '../../models/types';
import { AgentSearchResultType } from '../../search/types';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'agentRole',
    headerName: 'Role',
    flex: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderCell: (params: GridRenderCellParams<any, string>) => <AgentsSearchResultsRole role={params.value as AgentRoleType} />,
  },
  { field: 'agentName', headerName: 'Name', flex: 2 },
  { field: 'agentEmail', headerName: 'Email', flex: 3 },
  { field: 'agentPhone', headerName: 'Phone', flex: 2 },
  { field: 'officeName', headerName: 'Office', flex: 3 },
  { field: 'officeCity', headerName: 'City', flex: 2 },
  { field: 'officeZip', headerName: 'Zip', flex: 1 },
];

export type AgentsSearchResultsProps = {
  data: AgentSearchResultType[];
};

const AgentsSearchResults = ({ data }: AgentsSearchResultsProps) => (
  <SearchResults className="dano-agents-search-results" rows={data} columns={columns} />
);

AgentsSearchResults.displayName = 'AgentsSearchResults';

export { AgentsSearchResults };
