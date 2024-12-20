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
import Dashboard from "../../features/dashboard/dashboard"
import Rentals from "../../features/rentals/rentals"
import Referrals from "../../features/referrals/referrals"
import Contacts from "../../features/contacts/contacts"
import Chats from "../../features/chats/chats"
import DetailVisits from "../../features/visits/functionalities/detail-visits/detail-visits"
import CreateReferral from "../../features/referrals/functionalities/create-referral/create-referral"
import Wallet from "../../features/wallet/wallet"
import InfoProducts from "../../features/info-products/info-products"
import NotFound from "../../features/not-found/not-found"
import { settingsApp } from "../environment/settings"

export const router = createBrowserRouter(
  [
    {
      path: pathRoutes.SIGN_IN.to,
      element: <SignIn />,
    },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: pathRoutes.DASHBOARD.to,
          element: <Dashboard />,
        },
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
          children: [
            {
              path: pathRoutes.VISITS.to,
              element: <Visits />,
            },
            {
              path: pathRoutes.VISITS.otherPaths.VIEW.to,
              element: <DetailVisits />,
            },
          ],
        },
        {
          path: pathRoutes.RENTALS.to,
          element: <Rentals />,
        },
        {
          path: pathRoutes.REFERRALS.to,
          children: [
            {
              path: pathRoutes.REFERRALS.to,
              element: <Referrals />,
            },
            {
              path: pathRoutes.REFERRALS.otherPaths.CREATE.to,
              element: <CreateReferral />,
            },
          ],
        },
        {
          path: pathRoutes.WALLET.to,
          element: <Wallet />,
        },
        {
          path: pathRoutes.CONTACTS.to,
          element: <Contacts />,
        },
        {
          path: pathRoutes.CALENDAR.to,
          element: <div>CALENDAR</div>,
        },
        {
          path: pathRoutes.PROFILE.to,
          element: <div>MI PERFIL</div>,
        },
        {
          path: pathRoutes.CHATS.to,
          element: <Chats />,
        },
        {
          path: pathRoutes.INFO_PRODUCTS.to,
          element: <InfoProducts />,
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
      element: <NotFound />,
    },
  ],
  {
    basename: settingsApp.app.basePath,
  },
)
