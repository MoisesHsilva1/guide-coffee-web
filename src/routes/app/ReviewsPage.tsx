import React from "react";
import type { RouteObject } from "react-router";

const Reviews = React.lazy(() => import("@/components/templates/Reviews"));
const ReviewDetail = React.lazy(
  () => import("@/components/templates/ReviewDetail"),
);

const routes: RouteObject[] = [
  { path: "reviews", element: <Reviews /> },
  { path: "reviews/:id", element: <ReviewDetail /> },
];

export default routes;
