import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../services';

export function useGetGroups({ page = 0, limit = 20 }) {
  return useQuery({
    queryKey: ['groups', { page, limit }],
    queryFn: () => axiosClient.get('/api/group', { params: { page, limit } }).then((res) => res.data),
  });
}
