import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { ICardForm } from '../../types/Cards';

export function useUpdateCard({
  groupId,
  cardId,
  successCallback,
}: {
  groupId?: string;
  cardId?: string;
  successCallback?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: ICardForm) => axiosClient.put(`/api/card/${cardId}`, body).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Card updated', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['cards', groupId] });
      queryClient.invalidateQueries({ queryKey: ['card', cardId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Card update failed', { variant: 'error' });
    },
  });
}
