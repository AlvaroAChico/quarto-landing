import React from "react"
import { createBrowserRouter } from "react-router-dom"
import SignIn from "../../features/auth/sign-in/sign-in"
import DashboardLayout from "../../components/dashboard-layout/dashboard-layout"
import Permissions from "../../features/users/permissions/permissions"
import Users from "../../features/users/users"
import Dashboard from "../../features/dashboard/dashboard"
import Projects from "../../features/projects/projects"
import Details from "../../features/projects/details/details"
import CreateRole from "../../features/roles/funcionalities/create-role/create-role"
import Roles from "../../features/roles/roles"
        
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
            path: "/usuarios/create",
            element: <>Create User</>,
          },
          {
            path: "/usuarios/:id/permisos",
            element: <Permissions />,
          },
        ],
      },
      {
        path: "/roles",
        children: [
          {
            path: "/roles",
            element: <Roles />,
          },
          {
            path: "/roles/:id",
            element: <>View Role</>,
          },
          {
            path: "/roles/create",
            element: <CreateRole />,
          },
        ],
      },
      {
        path: "/proyectos",
        children: [
            {
              path: "/proyectos",
              element: <>Projectos</>,
            },
            {
              path: "/proyectos/:id/detalle",
              element: <><Details/></>,
            },
          ],
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
