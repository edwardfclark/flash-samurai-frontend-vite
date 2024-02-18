import { GridColDef, GridRowsProp, DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { CreateNewFolder } from '@mui/icons-material';
import { useGetGroups } from '../../hooks/Group/useGetGroups';
import { Actions } from './Actions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IGroup } from '../../types/Groups';

export function Groups() {
  const navigate = useNavigate();
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 20 });
  const {
    data: result,
    isLoading,
    isFetching,
  } = useGetGroups({
    page: paginationModel.page,
    limit: paginationModel.pageSize,
  });
  const showLoading = isLoading || isFetching;
  const data = result?.data || [];
  const total = result?.total || 0;

  const rows: GridRowsProp = data.map((group: IGroup) => ({
    id: group._id,
    name: group.name,
    description: group.description,
    owner: group?.owner ?? '-',
  }));

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', maxWidth: 150, flex: 1, sortable: false, filterable: false },
    { field: 'owner', headerName: 'Owner', maxWidth: 150, flex: 1, sortable: false, filterable: false },
    { field: 'description', headerName: 'Description', flex: 1, sortable: false, filterable: false },
    {
      field: 'actions',
      headerName: '',
      maxWidth: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableReorder: true,
      renderCell: ({ row }) => <Actions row={row} />,
    },
  ];

  return (
    <>
      <Typography variant="h2">Card Groups</Typography>
      <Typography variant="subtitle1" sx={{ margin: '0 0 1rem' }}>
        Card groups are broad categories that are mutually exclusive. Groups can contain many cards, but a card can only
        belong to one group.
      </Typography>
      {showLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: '5rem',
          }}
        >
          <CircularProgress size={80} />
        </Box>
      )}
      {!showLoading && (
        <>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              mb: '0.5rem',
            }}
          >
            <Button
              size="small"
              variant="contained"
              endIcon={<CreateNewFolder />}
              onClick={() => navigate('/groups/create')}
            >
              Create
            </Button>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationMode="server"
            rowCount={total}
            loading={isLoading}
            pageSizeOptions={[5, 10, 20, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            disableRowSelectionOnClick
          />
        </>
      )}
    </>
  );
}
