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
  APARTMENTS: {
    LIST: "/apartments",
    CREATE: "/apartments/create",
    DETAIL: {
      OVERVIEW: "/apartments/:id/overview",
      SERVICES: "/apartments/:id/services",
      APARTMENTS: "/apartments/:id/apartments",
      APARTMENTS_DETAIL: "/apartments/:id/apartments/:apartmentId",
      ACTIVITY: "/apartments/:id/activity",
      TASKS: "/apartments/:id/tasks",
      CONTRACTORS: "/apartments/:id/contractors",
      FILES: "/apartments/:id/files",
      SETTINGS: "/apartments/:id/settings",
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
    LIST_RESIDENTIAL: "/reports/residential",
    LIST_CUSTOMER: "/reports/customer",
    LIST_CONTRACTORS: "/reports/contractor",
  },
}
