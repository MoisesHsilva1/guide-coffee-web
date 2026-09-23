import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { createReview, fetch } from "@/service/review";
import type { ApiParam } from "@/types/interfaces/apiParam";
import type { reviewData } from "@/types/interfaces/reviewData";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";
import type { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";

export function useOngCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: reviewData) => createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ongs"] });
    },
  });
}

export function useReviewFetch(
  enable = true,
  options: ApiParam = {},
): UseQueryResult<ApiMultipleResponse<reviewResponse>> {
  return useQuery({
    queryKey: ["ongs", options],
    queryFn: () => fetch(options),
    enabled: enable,
    retry: 0,
  });
}
