import { Typography, Box, CircularProgress } from '@mui/material';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCard } from '../../hooks/Card/useGetCard';
import { CardForm } from '../../components/forms/CardForm';
import { useUpdateCard } from '../../hooks/Card/useUpdateCard';

export function CardUpdate() {
  const params = useParams();
  const groupId = params?.groupId;
  const cardId = params?.cardId;
  const { data: card, isLoading } = useGetCard({ cardId });
  const navigate = useNavigate();
  const { mutate, isLoading: updateLoading } = useUpdateCard({
    groupId,
    cardId,
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
          { name: 'Update Card', path: `/groups/${groupId}/cards/${cardId}/edit` },
        ]}
      />
      <Typography variant="h2" sx={{ margin: '0 0 2rem' }}>
        Update Card
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
        <CardForm
          defaultValues={card}
          isLoading={updateLoading}
          onCancel={() => navigate(`/groups/${groupId}/cards`)}
          onSubmit={mutate}
          groupId={groupId}
        />
      )}
    </>
  );
}
