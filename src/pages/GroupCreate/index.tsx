import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateGroup } from '../../hooks/Group/useCreateGroup';
import { GroupForm } from '../../components/forms/GroupForm';

export function GroupCreate() {
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateGroup({
    successCallback: () => {
      navigate('/');
    },
  });
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Card Groups', path: '/' },
          { name: 'Create Card Group', path: '/groups/create' },
        ]}
      />
      <Typography variant="h2" sx={{ margin: '0 0 2rem' }}>
        Create Card Group
      </Typography>
      <GroupForm onSubmit={mutate} isLoading={isLoading} onCancel={() => navigate('/')} />
    </>
  );
}
