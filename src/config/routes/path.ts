export const pathRoutes = {
  SIGN_IN: "/",
  DASHBOARD: "/dashboard",
  USERS: {
    LIST: "/users",
    CREATE: "/users/create",
  },
  ROLES: {
    LIST: "/roles",
    CREATE: "/roles/create",
  },
  PROJECTS: {
    LIST: "/projects",
    CREATE: "/projects/create",
    DETAIL: {
      LIST: "/projects/:id/detail",
      OVERVIEW: "/projects/:id/detail/overview",
      ACTIVITY: "/projects/:id/detail/activity",
      TASKS: "/projects/:id/detail/tasks",
    },
  },
  TASKS: {
    LIST: "/tasks",
    CREATE: "/tasks/create",
  },
  CALENDAR: {
    LIST: "/calendar",
  },
  REPORTS: {
    LIST: "/reports",
  },
}
