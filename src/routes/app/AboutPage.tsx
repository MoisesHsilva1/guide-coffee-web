import React from "react";
import type { RouteObject } from "react-router";

const About = React.lazy(() => import("@/components/templates/About"));

const routes: RouteObject[] = [{ path: "sobre", element: <About /> }];

export default routes;
