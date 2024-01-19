import { MouseEvent } from 'react';
import { Button, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

import SearchResults from '../search-results';
import { ZipLookupType } from '../../models/zip-lookup';

const preventDefault = (e: MouseEvent, cb: () => void) => {
  e.preventDefault();
  cb();
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Zip', flex: 1 },
  { field: 'city', headerName: 'City', flex: 2 },
  { field: 'neighborhoods', headerName: 'Neighborhoods', flex: 4 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={2}>
        <Button variant="contained" size="small" onClick={(e) => preventDefault(e, params.row.edit)}>
          Edit
        </Button>
      </Stack>
    ),
  },
];

export type ZipLookupSearchResultType = ZipLookupType & {
  edit: () => void;
  delete?: () => void;
};

export type ZipLookupSearchResultsProps = {
  data: ZipLookupSearchResultType[];
};

export default ({ data }: ZipLookupSearchResultsProps) => (
  <SearchResults className="dano-zip-lookup-search-results" rows={data} columns={columns} />
);
