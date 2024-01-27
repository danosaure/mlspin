import { GridColDef } from '@mui/x-data-grid';

import SearchResults from '../../search-results';
import { OfficesSearchResultsType } from '../../../search/offices';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 4 },
  { field: 'agentsCount', headerName: 'Agents', flex: 1 },
  { field: 'address', headerName: 'Address', flex: 3 },
  { field: 'city', headerName: 'City', flex: 2 },
  { field: 'zip', headerName: 'Zip', flex: 1 },
];

export type OfficesSearchResultsProps = {
  data: OfficesSearchResultsType[];
};

export default ({ data }: OfficesSearchResultsProps) => (
  <SearchResults className="dano-offices-search-results" rows={data} columns={columns} />
);
