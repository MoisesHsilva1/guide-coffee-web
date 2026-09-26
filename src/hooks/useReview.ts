import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { createReview, fetch, fetchReviewById } from "@/service/review";
import type { ApiParam } from "@/types/interfaces/apiParam";
import type { reviewData } from "@/types/interfaces/reviewData";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";
import type { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";

export function useOngCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: reviewData) => createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useReviewFetch(
  enable = true,
  options: ApiParam = {},
): UseQueryResult<ApiMultipleResponse<reviewResponse>> {
  return useQuery({
    queryKey: ["reviews", options],
    queryFn: () => fetch(options),
    enabled: enable,
    retry: 0,
  });
}

const REVIEWS_PAGE_SIZE = 10;

export function useInfiniteReviews() {
  return useInfiniteQuery({
    queryKey: ["reviews", "infinite"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      fetch({ offset: pageParam, limit: REVIEWS_PAGE_SIZE }),
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.rows.length;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    retry: 0,
  });
}

export function useReviewById(id?: string) {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => {
      if (!id) {
        throw new Error("ID da avaliação não informado");
      }

      return fetchReviewById(id);
    },
    enabled: Boolean(id),
    retry: 0,
  });
}
