import { Typography } from '@mui/material';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCard } from '../../hooks/Card/useCreateCard';
import { CardForm } from '../../components/forms/CardForm';

export function CardCreate() {
  const params = useParams();
  const groupId = params?.groupId;
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateCard({
    groupId,
    successCallback: () => {
      navigate(`/groups/${groupId}/cards`);
    },
  });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Card Groups', path: '/' },
          { name: 'Cards', path: `/groups/${groupId}/cards` },
          { name: 'Create Card', path: `/groups/${groupId}/cards/create` },
        ]}
      />
      <Typography variant="h2" sx={{ margin: '0 0 2rem' }}>
        Create Card
      </Typography>
      <CardForm
        onSubmit={(data) => mutate({ ...data, groupId })}
        isLoading={isLoading}
        onCancel={() => navigate(`/groups/${groupId}/cards`)}
        groupId={groupId}
      />
    </>
  );
}
