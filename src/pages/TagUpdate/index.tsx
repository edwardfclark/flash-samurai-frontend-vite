import { Typography, Box, CircularProgress } from '@mui/material';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetTag } from '../../hooks/Tag/useGetTag';
import { TagForm } from '../../components/forms/TagForm';
import { useUpdateTag } from '../../hooks/Tag/useUpdateTag';

export function TagUpdate() {
  const params = useParams();
  const groupId = params?.groupId;
  const tagId = params?.tagId;
  const { data: tag, isLoading } = useGetTag({ tagId });
  const navigate = useNavigate();
  const { mutate, isLoading: updateLoading } = useUpdateTag({
    groupId,
    tagId,
    successCallback: () => {
      navigate(`/groups/${groupId}/tags`);
    },
  });

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { name: 'Card Groups', path: '/' },
          { name: 'Tags', path: `/groups/${groupId}/tags` },
          { name: 'Update Tag', path: `/groups/${groupId}/tags/${tagId}/edit` },
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
        <TagForm
          defaultValues={tag}
          isLoading={updateLoading}
          onCancel={() => navigate(`/groups/${groupId}/tags`)}
          onSubmit={mutate}
        />
      )}
    </>
  );
}
