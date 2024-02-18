import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { ITagForm } from '../../types/Tags';

export function useCreateTag({ groupId, successCallback }: { groupId?: string; successCallback?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ITagForm) => axiosClient.post(`/api/tag`, body).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Tag created', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['tags', groupId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Tag creation failed', { variant: 'error' });
    },
  });
}
