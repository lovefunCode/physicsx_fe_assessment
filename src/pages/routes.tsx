import { RouteObject } from "react-router";

import { lazyLoadHelper } from "../utils/lazyLoadHelper";

export const routes: RouteObject[] = [
  {
    index: true,
    lazy: lazyLoadHelper(() => import("./Welcome/Welcome")),
  },
  {
    lazy: lazyLoadHelper(
      () => import("./ResultVisualization/ResultsVisualization")
    ),
    path: "/resultViz",
  },
];

export default routes;
