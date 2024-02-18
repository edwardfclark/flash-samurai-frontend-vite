import { useQuery } from '@tanstack/react-query';
import { axiosClient } from '../../services';

export function useGetTag({ tagId }: { tagId?: string }) {
  return useQuery({
    queryKey: ['tag', tagId],
    queryFn: () => axiosClient.get(`/api/tag/${tagId}`).then((res) => res.data),
    enabled: !!tagId,
  });
}
