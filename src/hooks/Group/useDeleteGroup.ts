import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';

export function useDeleteGroup({ groupId, successCallback }: { groupId?: string; successCallback?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axiosClient.delete(`/api/group/${groupId}`).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Group deleted', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Group deletion failed', { variant: 'error' });
    },
  });
}
