import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';

export function useDeleteTag({
  groupId,
  successCallback,
  tagId,
}: {
  tagId?: string;
  successCallback?: () => void;
  groupId?: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosClient.delete(`/api/tag/${tagId}`).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Tag deleted', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['tags', groupId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Tag deletion failed', { variant: 'error' });
    },
  });
}
