import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { IGroupForm } from '../../types/Groups';

export function useCreateGroup({ successCallback }: { successCallback?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: IGroupForm) => axiosClient.post('/api/group', body).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Group created', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Group creation failed', { variant: 'error' });
    },
  });
}
