import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { ITagForm } from '../../types/Tags';

export function useUpdateTag({
  groupId,
  tagId,
  successCallback,
}: {
  groupId?: string;
  tagId?: string;
  successCallback?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (tag: ITagForm) => axiosClient.put(`/api/tag/${tagId}`, tag).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Tag updated', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['tags', groupId] });
      queryClient.invalidateQueries({ queryKey: ['tag', tagId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Tag update failed', { variant: 'error' });
    },
  });
}
