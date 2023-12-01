type TRoute = {
  path: string;
  element: any;
  layout?: any;
  subRoutes?: TRoute[];
};

export type { TRoute };
