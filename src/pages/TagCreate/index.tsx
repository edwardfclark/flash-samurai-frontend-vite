import { Typography } from '@mui/material';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTag } from '../../hooks/Tag/useCreateTag';
import { TagForm } from '../../components/forms/TagForm';

export function TagCreate() {
  const params = useParams();
  const groupId = params?.groupId;
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateTag({
    groupId,
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
          { name: 'Create Tag', path: `/groups/${groupId}/tags/create` },
        ]}
      />
      <Typography variant="h2" sx={{ margin: '0 0 2rem' }}>
        Create Tag
      </Typography>
      <TagForm
        onSubmit={(data) => mutate({ ...data, groupId })}
        isLoading={isLoading}
        onCancel={() => navigate(`/groups/${groupId}/tags`)}
      />
    </>
  );
}
