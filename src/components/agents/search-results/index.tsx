import { GridColDef } from '@mui/x-data-grid';

import AgentType from '../../../types/agent';
import SearchResults from '../../search-results';

const columns: GridColDef[] = [
  // { field: 'id', headerName: 'ID', flex: 1 },
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
