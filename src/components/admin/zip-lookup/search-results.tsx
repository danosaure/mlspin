import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { AdminZipLookupNeighborhoodCell } from './neighborhood-cell';
import { SearchResults } from '../../search-results';
import { displayName } from '../../../utils';
import namespace from './namespace';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Zip', flex: 1 },
  { field: 'city', headerName: 'City to display', flex: 1 },
  {
    field: 'neighborhoods',
    headerName: 'Searchable by',
    flex: 4,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderCell: (params: GridRenderCellParams<any, string[]>) => (
      <AdminZipLookupNeighborhoodCell value={params.value} save={params.row.save} />
    ),
  },
];

export type ZipLookupSearchResultsType = {
  id: string;
  neighborhoods: string[];
  save: (value: string[]) => Promise<void>;
};

export type ZipLookupSearchResultsProps = {
  data: ZipLookupSearchResultsType[];
};

const AdminZipLookupSearchResults = ({ data }: ZipLookupSearchResultsProps) => (
  <SearchResults className="dano-zip-lookup-search-results" rows={data} columns={columns} />
);

AdminZipLookupSearchResults.displayName = displayName(namespace('AdminZipLookupSearchResults'));

export { AdminZipLookupSearchResults };
