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
import NotFound from "../../features/not-found/not-found"
import LandingLayout from "../../components/landing-layout/landing-layout"
import Home from "../../features/auth/home/home"
import PropertyDetails from "../../features/properties/property-details/property-details"
import ScheduleProperty from "../../features/properties/schedule-property/schedule-property"
import EmptyLayout from "../../components/empty-layout/empty-layout"
import Register from "../../features/register/register"
import VerifyEmail from "../../features/auth/verify-email/verify-email"
import SignInVerify from "../../features/auth/sign-in/sign-in-verify/sign-in-verify"
import CompleteRegister from "../../features/auth/register/complete-register/complete-register"

export const router = createBrowserRouter([
  {
    path: pathRoutes.SIGN_IN.to,
    element: <SignIn />,
  },
  {
    path: pathRoutes.SIGN_IN.otherPaths.VERIFY.to,
    element: <SignInVerify />,
  },
  {
    element: <LandingLayout />,
    children: [
      {
        path: pathRoutes.HOME.to,
        element: <Home />,
      },
      {
        path: pathRoutes.PROPERTY.to,
        children: [
          {
            path: pathRoutes.PROPERTY.to,
            element: <Properties />,
          },
          {
            path: pathRoutes.PROPERTY.otherPaths.DETAIL.to,
            element: <PropertyDetails />,
          },
          {
            path: pathRoutes.PROPERTY.otherPaths.SCHEDULE.to,
            element: <ScheduleProperty />,
          },
        ],
      },
    ],
  },
  {
    element: <EmptyLayout />,
    children: [
      {
        path: pathRoutes.PROPERTY.otherPaths.SCHEDULE.to,
        children: [
          {
            path: pathRoutes.PROPERTY.otherPaths.SCHEDULE.to,
            element: <ScheduleProperty />,
          },
        ],
      },
      {
        path: pathRoutes.PROPERTY.otherPaths.CREATE.to,
        element: <CreateProperty />,
      },
      {
        path: pathRoutes.REGISTER.to,
        element: <Register />,
      },
      {
        path: pathRoutes.REGISTER.otherPaths.COMPLETE_REGISTER.to,
        element: <CompleteRegister />,
      },
      {
        path: pathRoutes.VERIFY_EMAIL.to,
        element: <VerifyEmail />,
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
    path: `/*`,
    element: <NotFound />,
  },
])
