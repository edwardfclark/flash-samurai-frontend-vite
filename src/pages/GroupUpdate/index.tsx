import { useParams } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useGetGroup } from '../../hooks/Group/useGetGroup';
import { useUpdateGroup } from '../../hooks/Group/useUpdateGroup';
import { GroupForm } from '../../components/forms/GroupForm';

export function GroupUpdate() {
  const params = useParams();
  const groupId = params?.groupId;
  const { data: group, isLoading } = useGetGroup({ groupId });
  const navigate = useNavigate();
  const { mutate, isLoading: updateLoading } = useUpdateGroup({
    groupId,
    successCallback: () => {
      navigate('/');
    },
  });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Card Groups', path: '/' },
          { name: 'Update Card Group', path: `/groups/${groupId}/edit` },
        ]}
      />
      <Typography variant="h2" sx={{ margin: '0 0 2rem' }}>
        Update Card Group
      </Typography>
      {isLoading && (
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
      {!isLoading && (
        <GroupForm defaultValues={group} isLoading={updateLoading} onCancel={() => navigate('/')} onSubmit={mutate} />
      )}
    </>
  );
}
