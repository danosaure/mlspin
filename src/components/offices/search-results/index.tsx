import { GridColDef } from '@mui/x-data-grid';

import SearchResults from '../../search-results';
import OfficeType from '../../../types/office';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 4 },
  { field: 'address', headerName: 'Address', flex: 3 },
  { field: 'city', headerName: 'City', flex: 2 },
  { field: 'zip', headerName: 'Zip', flex: 1 },
];

export type OfficesSearchResultsProps = {
  data: OfficeType[];
};

export default ({ data }: OfficesSearchResultsProps) => (
  <SearchResults className="dano-offices-search-results" rows={data} columns={columns} />
);
