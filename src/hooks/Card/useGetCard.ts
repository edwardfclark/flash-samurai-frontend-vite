import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../services';

export function useGetCard({ cardId }: { cardId?: string }) {
  return useQuery({
    queryKey: ['card', cardId],
    queryFn: () => axiosClient.get(`/api/card/${cardId}`).then((res) => res.data),
    enabled: !!cardId,
  });
}
