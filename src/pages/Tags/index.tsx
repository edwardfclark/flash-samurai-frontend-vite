import { GridColDef, GridRowsProp, DataGrid } from '@mui/x-data-grid';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { Label } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useGetGroup } from '../../hooks/Group/useGetGroup';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useGetTags } from '../../hooks/Tag/useGetTags';
import { ITag } from '../../types/Tags';
import { Actions } from './Actions';

export function Tags() {
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params?.groupId;
  const { data: group } = useGetGroup({ groupId });
  const { data: result, isLoading, isFetching } = useGetTags({ groupId });
  const showLoading = isLoading || isFetching;
  const data = result?.data || [];
  const total = result?.total || 0;

  const rows: GridRowsProp = data.map((group: ITag) => ({
    id: group._id,
    name: group.name,
    description: group.description ?? '-',
  }));

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', maxWidth: 150, flex: 1, sortable: false, filterable: false },
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
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Card Groups', path: '/' },
          { name: 'Tags', path: `/groups/${groupId}/tags` },
        ]}
      />
      <Typography variant="h2">{`${group?.name ?? 'Group'} Tags`}</Typography>
      <Typography variant="subtitle1" sx={{ margin: '0 0 1rem' }}>
        Tags are labels that can be applied to cards. A tag can belong to only one group, but a card can have multiple
        tags.
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
              endIcon={<Label />}
              onClick={() => navigate(`/groups/${groupId}/tags/create`)}
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
            disableRowSelectionOnClick
          />
        </>
      )}
    </>
  );
}
