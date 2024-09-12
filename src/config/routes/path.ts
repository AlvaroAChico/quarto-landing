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
      OVERVIEW: "/projects/:id/overview",
      APARTMENTS: "/projects/:id/apartments",
      APARTMENTS_DETAIL: "/projects/:id/apartments/:apartmentId",
      ACTIVITY: "/projects/:id/activity",
      TASKS: "/projects/:id/tasks",
      CONTRACTORS: "/projects/:id/contractors",
      FILES: "/projects/:id/files",
      SETTINGS: "/projects/:id/settings",
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
