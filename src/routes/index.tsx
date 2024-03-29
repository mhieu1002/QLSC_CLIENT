import { size } from "lodash";
import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { TRoute } from "../types/route";
import DashboardLayout from "../layouts/DashboardLayout";
import PrinterRepair from "../pages/PrinterRepair/PrinterRepair";
import loading from "../pages/load/loading";
import MeetingRepair from "../pages/meeting/MeetingRepair";

const Login = lazy(() => import("../pages/Login"));
const Employee = lazy(() => import("../pages/Employee/Employee"));
const FormEmployee = lazy(() => import("../pages/Employee/FormEmployee"));
const Department = lazy(() => import("../pages/Department/Department"));
const FormDepartment = lazy(() => import("../pages/Department/FormDepartment"));
const Problem = lazy(() => import("../pages/Problem/Problem"));
const FormProblem = lazy(() => import("../pages/Problem/FormProblem"));
const FormPrinterRepair = lazy(() => import("../pages/PrinterRepair/FormPrinterRepair"));
const FormMeetingRepair = lazy(() => import("../pages/meeting/FormMeeting"));
const ProblemReportByDepartment = lazy(
  () => import("../pages/Problem/ProblemReportByDepartment")
);
const ProblemReportIndustry = lazy(
  () => import("../pages/Problem/ProblemReportByIndustry")
);
const ProblemStatistical = lazy(() => import("../pages/ProblemStatistical"));

const routes: TRoute[] = [
  {
    path: "/login",
    element: Login,
    layout: null,
  },
  {
    path: "/loading",
    element: loading,
    layout: null,
  },
  {
    path: "/statistical",
    element: ProblemStatistical,
    layout: DashboardLayout,
  },
  {
    path: "/meeting-schedule",
    element: MeetingRepair,
    layout: DashboardLayout,
    subRoutes: [
      {
        path: "/add",
        element: FormMeetingRepair,
        layout: DashboardLayout,
      },
      {
        path: "/:id",
        element: FormMeetingRepair,
        layout: DashboardLayout,
      },
    ],
  },
  {
    path: "/sign-up-for-printer-repair",
    element: PrinterRepair,
    layout: DashboardLayout,
    subRoutes: [
      {
        path: "/add",
        element: FormPrinterRepair,
        layout: DashboardLayout,
      },
      {
        path: "/:id",
        element: FormPrinterRepair,
        layout: DashboardLayout,
      },
    ],
  },
  {
    path: "/problem-report-department",
    element: ProblemReportByDepartment,
    layout: DashboardLayout,
  },
  {
    path: "/problem-report-industry",
    element: ProblemReportIndustry,
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
        path: "/problem/add",
        element: FormProblem,
        layout: DashboardLayout,
      },
      {
        path: "/problem/:id",
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
