import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export interface SearchResultsProps {
  className?: string;
  columns: GridColDef[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: Record<string, any>[];
}

export default ({ className, columns, rows }: SearchResultsProps) => (
  <Box className={`dano-search-results ${className}`}>
    <DataGrid
      className={`dano-search-results-grid ${className}`}
      rows={rows}
      columns={columns}
      isRowSelectable={() => false}
      disableColumnSelector
      disableRowSelectionOnClick
      density="compact"
      slots={{ toolbar: GridToolbar }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 50,
          },
        },
      }}
    />
  </Box>
);
