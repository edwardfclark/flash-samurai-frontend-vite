import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { IGroupForm } from '../../types/Groups';

export function useUpdateGroup({ groupId, successCallback }: { groupId?: string; successCallback?: () => void }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (group: IGroupForm) => axiosClient.put(`/api/group/${groupId}`, group).then((res) => res.data),
    onSuccess: () => {
      enqueueSnackbar('Group updated', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      queryClient.invalidateQueries({ queryKey: ['group', groupId] });
      successCallback?.();
    },
    onError: () => {
      enqueueSnackbar('Group update failed', { variant: 'error' });
    },
  });
}
