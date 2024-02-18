import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';

export function useDeleteCard({
  groupId,
  successCallback,
  cardId,
  page,
  limit,
}: {
  cardId?: string;
  successCallback?: () => void;
  groupId?: string;
  page?: string;
  limit?: string;
}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosClient.delete(`/api/card/${cardId}`).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Card deleted', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['cards', { groupId, page, limit }] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Card deletion failed', { variant: 'error' });
    },
  });
}
