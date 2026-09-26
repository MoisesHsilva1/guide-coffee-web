import React from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";

const Maps = React.lazy(() => import("@/components/templates/Maps"));

const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="" replace={true} />,
  },
  { path: "maps", element: <Maps /> },
];

export default routes;

