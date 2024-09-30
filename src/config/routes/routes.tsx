import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
import Users from "../../features/users/users"
import Dashboard from "../../features/dashboard/dashboard"
import CreateRole from "../../features/roles/funcionalities/create-role/create-role"
import Roles from "../../features/roles/roles"
import CreateUser from "../../features/users/functionalities/create-user/create-user"
import { pathRoutes } from "./path"
import Services from "../../features/services/services"
import Calendar from "../../features/calendar/calendar"
import ContractorReport from "../../features/reports/contractor-report/contractor-reports"
// PROPERTIES IMPORTS
import Properties from "../../features/properties/properties"
import PropertyDetailLayout from "../../features/properties/property-detail-layout/property-detail-layout"
import DetailsApartmentsById from "../../features/properties/property-detail-layout/components/apartments/details/apartments_detail"
import CreateProperty from "../../features/properties/functionalities/create-property/create-property"
import DetailsOverview from "../../features/properties/property-detail-layout/components/overview/overview"
import DetailsTask from "../../features/properties/property-detail-layout/components/task/task"
import DetailContractors from "../../features/properties/property-detail-layout/components/contractors/contractors"
import DetailsApartments from "../../features/properties/property-detail-layout/components/apartments/apartments"
import DetailsActivity from "../../features/properties/property-detail-layout/components/activity/activity"
import DetailFiles from "../../features/properties/property-detail-layout/components/files/files"
import ResidentialReport from "../../features/reports/property-report/property-report"
// APARTMENTS IMPORTS
import Apartments from "../../features/apartments/apartments"
import CreateApartment from "../../features/apartments/functionalities/create-project/create-apartment"
import OverviewApartment from "../../features/apartments/details/components/overview/overview-apartment"
import ApartmentDetails from "../../features/apartments/details/header-detail-apart"
import HeaderDetailApart from "../../features/apartments/details/header-detail-apart"
import ServicesApartment from "../../features/apartments/details/components/apartments/services-apartment"
import Assignments from "../../features/assignments/assignments"
import CreateService from "../../features/services/functionalities/create-service/create-service"
import ManagementCompany from "../../features/management-company/management-company"
import CreateManagementCompany from "../../features/management-company/funcionalities/create-management-company/create-management-company"
import DailyCalendar from "../../features/daily-calendar/daily-calendar"

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
        path: pathRoutes.PROPERTIES.LIST,
        children: [
          {
            path: pathRoutes.PROPERTIES.LIST,
            element: <Properties />,
          },
          {
            path: pathRoutes.PROPERTIES.CREATE,
            element: <CreateProperty />,
          },
          {
            element: <PropertyDetailLayout />,
            children: [
              {
                path: pathRoutes.PROPERTIES.DETAIL.OVERVIEW,
                element: <DetailsOverview />,
                index: true,
              },
              {
                path: pathRoutes.PROPERTIES.DETAIL.APARTMENTS,
                element: <DetailsApartments />,
              },
              {
                path: pathRoutes.PROPERTIES.DETAIL.APARTMENTS_DETAIL,
                element: <DetailsApartmentsById />,
              },
              {
                path: pathRoutes.PROPERTIES.DETAIL.ACTIVITY,
                element: <DetailsActivity />,
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
            ],
          },
        ],
      },
      {
        path: pathRoutes.ASSIGNMENTS.LIST,
        children: [
          {
            path: pathRoutes.ASSIGNMENTS.LIST,
            element: <Assignments />,
          },
        ],
      },
      {
        path: pathRoutes.SERVICES.LIST,
        children: [
          {
            path: pathRoutes.SERVICES.LIST,
            element: <Services />,
          },
          {
            path: pathRoutes.SERVICES.CREATE,
            element: <CreateService />,
          },
        ],
      },
      {
        path: pathRoutes.MANAGEMENT_COMPANY.LIST,
        children: [
          {
            path: pathRoutes.MANAGEMENT_COMPANY.LIST,
            element: <ManagementCompany />,
          },
          {
            path: pathRoutes.MANAGEMENT_COMPANY.CREATE,
            element: <CreateManagementCompany />,
          },
        ],
      },
      {
        path: pathRoutes.CALENDAR.LIST,
        element: <Calendar />,
      },
      {
        path: pathRoutes.DAILY_CALENDAR.LIST,
        element: <DailyCalendar />,
      },
      {
        path: pathRoutes.REPORTS.LIST_RESIDENTIAL,
        element: <ResidentialReport />,
      },
      {
        path: pathRoutes.REPORTS.LIST_CUSTOMER,
        element: <></>,
      },
      {
        path: pathRoutes.REPORTS.LIST_CONTRACTORS,
        element: <ContractorReport />,
      },
    ],
  },
  {
    path: "*",
    element: <>NotFound</>,
  },
])
