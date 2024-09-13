import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
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
import DetailFiles from "../../features/projects/details/components/files/files"
import DetailContractors from "../../features/projects/details/components/contractors/contractors"
import DetailsApartmentsById from "../../features/projects/details/components/apartments/details/apartments_detail"
import Apartments from "../../features/apartments/apartments"
import OverviewApartment from "../../features/apartments/details/components/overview/overview-apartment"
import ApartmentDetails from "../../features/apartments/details/header-detail-apart"
import HeaderDetailApart from "../../features/apartments/details/header-detail-apart"
import DetailsApartments from "../../features/projects/details/components/apartments/apartments"
import ServicesApartment from "../../features/apartments/details/components/apartments/services-apartment"
import CreateApartment from "../../features/apartments/functionalities/create-project/create-apartment"

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
            element: <Details />,
            children: [
              {
                path: pathRoutes.PROJECTS.DETAIL.OVERVIEW,
                element: <DetailsOverview />,
                index: true,
              },
              {
                path: pathRoutes.PROJECTS.DETAIL.APARTMENTS,
                element: <DetailsApartments />,
              },
              {
                path: pathRoutes.PROJECTS.DETAIL.APARTMENTS_DETAIL,
                element: <DetailsApartmentsById />,
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
                path: pathRoutes.PROJECTS.DETAIL.CONTRACTORS,
                element: <DetailContractors />,
              },
              {
                path: pathRoutes.PROJECTS.DETAIL.FILES,
                element: <DetailFiles />,
              },
              {
                path: "/projects/:id/settings",
                element: <></>,
              },
            ],
          },
        ],
      },
      {
        path: pathRoutes.APARTMENTS.LIST,
        children: [
          {
            path: pathRoutes.APARTMENTS.LIST,
            element: <Apartments />,
          },
          {
            path: pathRoutes.APARTMENTS.CREATE,
            element: <CreateApartment />,
          },
          {
            element: <HeaderDetailApart />,
            children: [
              {
                path: pathRoutes.APARTMENTS.DETAIL.OVERVIEW,
                element: <OverviewApartment />,
                index: true,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.SERVICES,
                element: <ServicesApartment />,
                index: true,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.APARTMENTS,
                element: <ApartmentDetails />,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.APARTMENTS_DETAIL,
                element: <DetailsApartmentsById />,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.ACTIVITY,
                element: <DetailsActivity />,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.TASKS,
                element: <DetailsTask />,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.CONTRACTORS,
                element: <DetailContractors />,
              },
              {
                path: pathRoutes.APARTMENTS.DETAIL.FILES,
                element: <DetailFiles />,
              },
              {
                path: "/apartments/:id/settings",
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
        path: pathRoutes.REPORTS.LIST_PROJECTS,
        element: <Reports />,
      },
      {
        path: pathRoutes.REPORTS.LIST_CUSTOMER,
        element: <Reports />,
      },
      {
        path: pathRoutes.REPORTS.LIST_CONTRACTORS,
        element: <Reports />,
      },
    ],
  },
  {
    path: "*",
    element: <>NotFound</>,
  },
])
