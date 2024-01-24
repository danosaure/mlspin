import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import SearchResultsRole from './search-results--role';
import SearchResults from '../search-results';
import AgentType from '../../types/agent';
import AgentRoleType from '../../types/agent-role';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', flex: 1 },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderCell: (params: GridRenderCellParams<any, string>) => <SearchResultsRole role={params.value as AgentRoleType} />,
  },
  { field: 'name', headerName: 'Name', flex: 2 },
  { field: 'email', headerName: 'Email', flex: 3 },
  { field: 'phone', headerName: 'Phone', flex: 2 },
  { field: '_office.name', headerName: 'Office', flex: 3 },
  { field: '_office.city', headerName: 'City', flex: 2 },
  { field: '_office.zip', headerName: 'Zip', flex: 1 },
];

export type AgentsSearchResultsProps = {
  data: AgentType[];
};

export default ({ data }: AgentsSearchResultsProps) => (
  <SearchResults className="dano-agents-search-results" rows={data} columns={columns} />
);
