import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../services';

export function useGetTags({ groupId }: { groupId?: string }) {
  return useQuery({
    queryKey: ['tags', groupId],
    queryFn: () => axiosClient.get(`/api/group/${groupId}/tags`).then((res) => res.data),
  });
}
