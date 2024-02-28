import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../services";

async function fetchCards({
  groupId,
  page,
  limit,
}: {
  groupId?: string;
  page: string;
  limit: string;
}) {
  return await axiosClient
    .get(`/api/group/${groupId}/cards`, { params: { page, limit } })
    .then((res) => res.data);
}

export function useGetCards({
  groupId,
  page = "0",
  limit = "20",
}: {
  groupId?: string;
  page: string;
  limit: string;
}) {
  return useQuery({
    queryKey: ["cards", { groupId, page, limit }],
    queryFn: () => fetchCards({ groupId, page, limit }),
  });
}
