import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '../../services';
import { enqueueSnackbar } from 'notistack';
import { ICard } from '../../types/Cards';

export function useGenerateQuizCard({
  tagNames,
  groupId,
  successCallback,
}: {
  tagNames?: string[];
  groupId?: string;
  successCallback?: (res: { data: ICard; total: number }) => void;
}) {
  return useMutation({
    mutationFn: () =>
      axiosClient.get(`/api/group/${groupId}/quiz`, { params: { tagNames: tagNames ?? [] } }).then((res) => res.data),
    onSuccess: (res) => {
      successCallback?.(res);
    },
    onError: () => {
      enqueueSnackbar('Something went wrong fetching your card', { variant: 'error' });
    },
  });
}
