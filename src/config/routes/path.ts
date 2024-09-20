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
  SERVICES: {
    LIST: "/services",
    CREATE: "/services/create",
  },
  MANAGEMENT_COMPANY: {
    LIST: "/management-company",
    CREATE: "/management-company/create",
  },
  PROPERTIES: {
    LIST: "/properties",
    CREATE: "/properties/create",
    DETAIL: {
      OVERVIEW: "/properties/:id/overview",
      APARTMENTS: "/properties/:id/apartments",
      APARTMENTS_DETAIL: "/properties/:id/apartments/:apartmentId",
      ACTIVITY: "/properties/:id/activity",
      TASKS: "/properties/:id/tasks",
      CONTRACTORS: "/properties/:id/contractors",
      FILES: "/properties/:id/files",
      SETTINGS: "/properties/:id/settings",
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
  ASSIGNMENTS: {
    LIST: "/assignments",
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
