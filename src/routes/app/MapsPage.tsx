import type { RouteObject } from "react-router";
import { Navigate } from "react-router";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="" replace={true} />,
  },
  { path: "maps", element: <Navigate to="/reviews" replace={true} /> },
];

export default routes;
