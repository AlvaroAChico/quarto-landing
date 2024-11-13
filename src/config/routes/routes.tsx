import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
import { pathRoutes } from "./paths"
// PROPERTIES IMPORTS
import Properties from "../../features/properties/properties"
import CreateProperty from "../../features/properties/functionalities/create-property/create-property"
// End PROPERTIES IMPORTS
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
        children: [
          {
            path: pathRoutes.PROPERTY.to,
            element: <Properties />,
          },
          {
            path: pathRoutes.PROPERTY.otherPaths.CREATE.to,
            element: <CreateProperty />,
          },
        ],
      },
      {
        path: pathRoutes.VISITS.to,
        element: <Visits />,
      },
      {
        path: pathRoutes.CALENDAR.to,
        element: <div>CALENDAR</div>,
      },
      {
        path: pathRoutes.RENTALS.to,
        element: <div>ALQUILERES</div>,
      },
      {
        path: pathRoutes.WINNINGS.to,
        element: <div>GANANCIAS</div>,
      },
      {
        path: pathRoutes.PROFILE.to,
        element: <div>MI PERFIL</div>,
      },
      {
        path: pathRoutes.INFO.to,
        element: <div>INFO</div>,
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
