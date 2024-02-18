import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../services';

export function useGetGroup({ groupId }: { groupId?: string }) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => axiosClient.get(`/api/group/${groupId}`).then((res) => res.data),
    enabled: !!groupId,
  });
}
