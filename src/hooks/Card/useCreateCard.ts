import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { ICardForm } from '../../types/Cards';

export function useCreateCard({ groupId, successCallback }: { groupId?: string; successCallback?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: ICardForm) => axiosClient.post(`/api/card`, body).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Card created', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['cards', groupId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Card creation failed', { variant: 'error' });
    },
  });
}
