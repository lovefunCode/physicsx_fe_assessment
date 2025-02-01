import { LazyRouteFunction, RouteObject } from 'react-router';

export const lazyLoadHelper = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  module: () => Promise<{ default: React.FC<any> }>,
): LazyRouteFunction<RouteObject> => {
  return async () => {
    const page = await module();

    return {
      Component: page.default,
    };
  };
};

export default lazyLoadHelper;
