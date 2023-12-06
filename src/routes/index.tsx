import { size } from "lodash";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { TRoute } from "../types/route";
import DashboardLayout from "../layouts/DashboardLayout";

const Login = lazy(() => import("../pages/Login"));
const Employee = lazy(() => import("../pages/Employee/Employee"));
const FormEmployee = lazy(() => import("../pages/Employee/FormEmployee"));
const Department = lazy(() => import("../pages/Department/Department"));
const FormDepartment = lazy(() => import("../pages/Department/FormDepartment"));
const Problem = lazy(() => import("../pages/Problem/Problem"));
const FormProblem = lazy(() => import("../pages/Problem/FormProblem"));
const ProblemReportByDepartment = lazy(
  () => import("../pages/Problem/ProblemReportByDepartment")
);

const routes: TRoute[] = [
  {
    path: "/login",
    element: Login,
    layout: null,
  },
  {
    path: "/problem-report-department",
    element: ProblemReportByDepartment,
    layout: DashboardLayout,
  },
  {
    path: "/employee",
    element: Employee,
    layout: DashboardLayout,
    subRoutes: [
      {
        path: "/add",
        element: FormEmployee,
        layout: DashboardLayout,
      },
      {
        path: "/:id",
        element: FormEmployee,
        layout: DashboardLayout,
      },
    ],
  },
  {
    path: "/department",
    element: Department,
    layout: DashboardLayout,
    subRoutes: [
      {
        path: "/add",
        element: FormDepartment,
        layout: DashboardLayout,
      },
      {
        path: "/:id",
        element: FormDepartment,
        layout: DashboardLayout,
      },
    ],
  },
  {
    path: "/",
    element: Problem,
    layout: DashboardLayout,
    subRoutes: [
      {
        path: "/add",
        element: FormProblem,
        layout: DashboardLayout,
      },
      {
        path: "/:id",
        element: FormProblem,
        layout: DashboardLayout,
      },
    ],
  },
];

const renderRouter = (props: {
  routes: TRoute[] | undefined;
  pathPrefix?: string;
}): React.ReactElement => {
  const { routes, pathPrefix } = props;
  return (
    <React.Fragment>
      {routes?.map((route: TRoute, index: number): React.ReactElement => {
        const Layout = route.layout || React.Fragment;
        const Page = route.element;
        const path = route.path === "*" ? "*" : (pathPrefix ?? "") + route.path;
        return (
          <React.Fragment key={index}>
            <Route
              path={path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
            {size(route?.subRoutes) > 0 &&
              renderRouter({ routes: route.subRoutes, pathPrefix: path })}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

const MainRoutes = (): React.ReactElement => {
  return (
    <Routes>
      {renderRouter({
        routes,
        pathPrefix: "",
      })}
    </Routes>
  );
};

export default MainRoutes;
