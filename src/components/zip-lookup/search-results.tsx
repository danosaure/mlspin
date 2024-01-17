import { GridColDef } from '@mui/x-data-grid';
import { ZipLookupType } from '../../models/zip-lookup';

import SearchResults from '../search-results';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Zip', flex: 1 },
  { field: 'city', headerName: 'City', flex: 2 },
  { field: 'neighborhoods', headerName: 'Neighborhoods', flex: 4 },
];

export type ZipLookupSearchResultsProps = {
  data: ZipLookupType[];
};

export default ({ data }: ZipLookupSearchResultsProps) => (
  <SearchResults className="dano-zip-lookup-search-results" rows={data} columns={columns} />
);
