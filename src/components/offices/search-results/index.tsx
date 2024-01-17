import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
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
  <Box className="dano-offices-search-results">
    <DataGrid rows={data} columns={columns} />
  </Box>
);
