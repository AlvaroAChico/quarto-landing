import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
import Permissions from "../../features/users/permissions/permissions"
import Users from "../../features/users/users"
import Dashboard from "../../features/dashboard/dashboard"
import Details from "../../features/projects/details/details"
import CreateRole from "../../features/roles/funcionalities/create-role/create-role"
import Roles from "../../features/roles/roles"
import Projects from "../../features/projects/projects"
import CreateUser from "../../features/users/functionalities/create-user/create-user"
import { pathRoutes } from "./path"
import Tasks from "../../features/tasks/tasks"
import CreateTask from "../../features/tasks/functionalities/create-task/create-task"
import Reports from "../../features/reports/reports"
import Calendar from "../../features/calendar/calendar"
import CreateProject from "../../features/projects/functionalities/create-project/create-project"
import DetailsOverview from "../../features/projects/details/components/overview/overview"
import DetailsTask from "../../features/projects/details/components/task/task"
import DetailsActivity from "../../features/projects/details/components/activity/activity"

export const router = createBrowserRouter([
  {
    path: pathRoutes.SIGN_IN,
    element: <SignIn />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: pathRoutes.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: pathRoutes.USERS.LIST,
        children: [
          {
            path: pathRoutes.USERS.LIST,
            element: <Users />,
          },
          {
            path: pathRoutes.USERS.CREATE,
            element: <CreateUser />,
          },
        ],
      },
      {
        path: pathRoutes.ROLES.LIST,
        children: [
          {
            path: pathRoutes.ROLES.LIST,
            element: <Roles />,
          },
          {
            path: pathRoutes.ROLES.CREATE,
            element: <CreateRole />,
          },
        ],
      },
      {
        path: pathRoutes.PROJECTS.LIST,
        children: [
          {
            path: pathRoutes.PROJECTS.LIST,
            element: <Projects />,
          },
          {
            path: pathRoutes.PROJECTS.CREATE,
            element: <CreateProject />,
          },
          {
            path: pathRoutes.PROJECTS.DETAIL.LIST,
            element: <Details />,
            children: [
              {
                path: pathRoutes.PROJECTS.DETAIL.OVERVIEW,
                element: <DetailsOverview />,
                index: true,
              },
              {
                path: pathRoutes.PROJECTS.DETAIL.ACTIVITY,
                element: <DetailsActivity />,
              },

              {
                path: pathRoutes.PROJECTS.DETAIL.TASKS,
                element: <DetailsTask />,
              },
              {
                path: "/projects/:id/detail/contractor",
                element: <></>,
              },
              {
                path: "/projects/:id/detail/file",
                element: <></>,
              },
              {
                path: "/projects/:id/detail/settings",
                element: <></>,
              },
            ],
          },
        ],
      },
      {
        path: pathRoutes.TASKS.LIST,
        children: [
          {
            path: pathRoutes.TASKS.LIST,
            element: <Tasks />,
          },
          {
            path: pathRoutes.TASKS.CREATE,
            element: <CreateTask />,
          },
        ],
      },
      {
        path: pathRoutes.CALENDAR.LIST,
        element: <Calendar />,
      },
      {
        path: pathRoutes.REPORTS.LIST,
        element: <Reports />,
      },
    ],
  },
  {
    path: "*",
    element: <>NotFound</>,
  },
])
