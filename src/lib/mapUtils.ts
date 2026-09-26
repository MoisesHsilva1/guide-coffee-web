import type { reviewResponse } from "@/types/interfaces/reviewResponse";

export type MapReview = reviewResponse;

export function hasValidCoordinates(review: MapReview) {
  return Number.isFinite(review.latitude) && Number.isFinite(review.longitude) && Math.abs(review.latitude) <= 90 && Math.abs(review.longitude) <= 180;
}

export function getDistanceInKm(first: [number, number], second: [number, number]) {
  const earthRadiusInKm = 6371;
  const latitudeDelta = ((second[1] - first[1]) * Math.PI) / 180;
  const longitudeDelta = ((second[0] - first[0]) * Math.PI) / 180;
  const firstLatitude = (first[1] * Math.PI) / 180;
  const secondLatitude = (second[1] * Math.PI) / 180;
  const haversine = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(firstLatitude) * Math.cos(secondLatitude) * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)) * earthRadiusInKm;
}

export function getMarkerColor(rating: number) {
  if (rating >= 4) return "#607654";
  if (rating >= 3) return "#B76A3D";
  return "#94877D";
}

export function formatDistance(distanceInKm: number) {
  if (distanceInKm < 1) return `${Math.round(distanceInKm * 1000)} m`;
  return `${distanceInKm.toFixed(1).replace(".", ",")} km`;
}
