import { api } from "@/api/api";
import type { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";
import type { ApiParam } from "@/types/interfaces/apiParam";
import type { reviewData } from "@/types/interfaces/reviewData";
import type { reviewResponse } from "@/types/interfaces/reviewResponse";

export async function createReview(data: reviewData): Promise<reviewData> {
  const response = await api.post("/reviews", data);

  return response.data;
}

export async function fetch(
  param?: ApiParam,
): Promise<ApiMultipleResponse<reviewResponse>> {
  const response = await api.get(
    `/reviews/?limit=${param?.limit}&offset=${param?.offset}&name=${param?.query}`,
  );

  return response.data;
}
