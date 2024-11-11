import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
import Users from "../../features/users/users"
import Dashboard from "../../features/dashboard/dashboard"
import CreateRole from "../../features/roles/funcionalities/create-role/create-role"
import Roles from "../../features/roles/roles"
import CreateUser from "../../features/users/functionalities/create-user/create-user"
import { pathRoutes } from "./paths"
import Services from "../../features/services/services"
import Calendar from "../../features/calendar/calendar"
import ContractorReport from "../../features/reports/contractor-report/contractor-reports"
// PROPERTIES IMPORTS
import Properties from "../../features/properties/properties"
// import PropertyDetailLayout from "../../features/properties/property-detail-layout/property-detail-layout"
// import DetailsApartmentsById from "../../features/properties/property-detail-layout/components/apartments/details/apartments_detail"
import CreateProperty from "../../features/properties/functionalities/create-property/create-property"
// import DetailsOverview from "../../features/properties/property-detail-layout/components/overview/overview"
// import DetailsTask from "../../features/properties/property-detail-layout/components/task/task"
// import DetailContractors from "../../features/properties/property-detail-layout/components/contractors/contractors"
// import DetailsApartments from "../../features/properties/property-detail-layout/components/apartments/apartments"
// import DetailsActivity from "../../features/properties/property-detail-layout/components/activity/activity"
// import DetailFiles from "../../features/properties/property-detail-layout/components/files/files"
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
import RecoveryPass from "../../features/auth/recovery-pass/recovery-pass"
import ResetPassword from "../../features/auth/reset-password/reset-password"
import Visits from "../../features/visits/visits"

export const router = createBrowserRouter([
  {
    path: pathRoutes.SIGN_IN.to,
    element: <SignIn />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: pathRoutes.PROPERTY.to,
        element: <Properties />,
      },
      {
        path: pathRoutes.CREATE_PROPERTY.to,
        element: <CreateProperty />,
      },
      // {
      //   path: pathRoutes.USERS.LIST,
      //   children: [
      //     {
      //       path: pathRoutes.USERS.LIST,
      //       element: <Users />,
      //     },
      //     {
      //       path: pathRoutes.USERS.CREATE,
      //       element: <CreateUser />,
      //     },
      //   ],
      // },
      {
        path: pathRoutes.VISITS.to,
        element: <Visits />,
      },
      {
        path: pathRoutes.CALENDAR.to,
        element: <DailyCalendar />,
      },
    ],
  },
  {
    path: pathRoutes.RECOVERY_PASS.to,
    element: <RecoveryPass />,
  },
  {
    path: pathRoutes.RESET_PASSWORD.to,
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <>NotFound</>,
  },
])
