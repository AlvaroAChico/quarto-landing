import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
import Permissions from "../../features/users/permissions/permissions"
import Users from "../../features/users/users"
import Roles from "../../features/roles/funcionalities/create-rol/create-rol"
import Dashboard from "../../features/dashboard/dashboard"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/usuarios",
        children: [
          {
            path: "/usuarios",
            element: <Users />,
          },
          {
            path: "/usuarios/:id",
            element: <>View User</>,
          },
          {
            path: "/usuarios/:id/permisos",
            element: <Permissions />,
          },
        ],
      },
      {
        path: "/roles",
        element: <Roles/>,
      },
      {
        path: "/proyectos",
        element: <>Proyectos</>,
      },
      {
        path: "/tareas",
        element: <>Tareas</>,
      },
      {
        path: "/calendario",
        element: <>Calendario</>,
      },
      {
        path: "/reportes",
        element: <>Reportes</>,
      },
    ],
  },
  {
    path: "*",
    element: <>NotFound</>,
  },
])
