import React from "react";
import type { RouteObject } from "react-router";

const Ideas = React.lazy(() => import("@/components/templates/Ideas"));

const routes: RouteObject[] = [{ path: "ideias", element: <Ideas /> }];

export default routes;
