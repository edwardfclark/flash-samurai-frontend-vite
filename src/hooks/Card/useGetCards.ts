import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../services';

export function useGetCards({ groupId, page = '0', limit = '20' }: { groupId?: string; page: string; limit: string }) {
  return useQuery({
    queryKey: ['cards', { groupId, page, limit }],
    queryFn: () => axiosClient.get(`/api/group/${groupId}/cards`, { params: { page, limit } }).then((res) => res.data),
  });
}
