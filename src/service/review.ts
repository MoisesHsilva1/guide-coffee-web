import { api } from "@/api/api";
import type { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";
import type { ApiParam } from "@/types/interfaces/apiParam";
import type { reviewData } from "@/types/interfaces/reviewData";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";

export async function createReview(data: reviewData): Promise<reviewData> {
  const response = await api.post("/api/v1/reviews", data);

  return response.data;
}

export async function fetch(
  param?: ApiParam,
): Promise<ApiMultipleResponse<reviewResponse>> {
  const searchParams = new URLSearchParams();

  if (param?.limit !== undefined) searchParams.set("limit", String(param.limit));
  if (param?.offset !== undefined) searchParams.set("offset", String(param.offset));
  if (param?.query) searchParams.set("name", param.query);

  const query = searchParams.toString();
  const requestUrl = query.length > 0 ? "/api/v1/reviews?" + query : "/api/v1/reviews";
  const response = await api.get(requestUrl);

  return response.data;
}

export async function fetchReviewById(id: string): Promise<reviewResponse> {
  const response = await api.get(
    "/api/v1/reviews/" + encodeURIComponent(id),
  );

  return response.data;
}
