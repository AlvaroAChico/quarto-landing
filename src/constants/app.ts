export enum APP_CONSTANS {
  PENDING_APP = "PENDING_APP",
}

export enum APP_MENU {
  LIST = "list",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  READ_OWN = "read-own",
}

export enum NAME_APP_MENU {
  DASHBOARD_LIST = "dashboard-list",
  USER_CREATE = "user-create",
  USER_LIST = "user-list",
  USER_READ_OWN = "user-read-own",
  USER_UPDATE = "user-update",
  USER_DELETE = "user-delete",
  ROLE_CREATE = "role-create",
  ROLE_LIST = "role-list",
  ROLE_READ_OWN = "role-read-own",
  ROLE_UPDATE = "role-update",
  ROLE_DELETE = "role-delete",
  SERVICE_CREATE = "service-create",
  SERVICE_LIST = "service-list",
  SERVICE_READ_OWN = "service-read-own",
  SERVICE_UPDATE = "service-update",
  SERVICE_DELETE = "service-delete",
  PROPERTY_CREATE = "property-create",
  PROPERTY_LIST = "property-list",
  PROPERTY_READ_OWN = "property-read-own",
  PROPERTY_UPDATE = "property-update",
  PROPERTY_DELETE = "property-delete",
  APARTMENT_CREATE = "apartment-create",
  APARTMENT_LIST = "apartment-list",
  APARTMENT_READ_OWN = "apartment-read-own",
  APARTMENT_UPDATE = "apartment-update",
  APARTMENT_DELETE = "apartment-delete",
  ASSIGNMENT_CREATE = "assignment-create",
  ASSIGNMENT_LIST = "assignment-list",
  ASSIGNMENT_READ_OWN = "assignment-read-own",
  ASSIGNMENT_UPDATE = "assignment-update",
  ASSIGNMENT_DELETE = "assignment-delete",
  CALENDAR_LIST = "calendar-list",
  CALENDAR_READ_OWN = "calendar-read-own",
  REPORTS_LIST = "reports-list",
}

export enum APP_PERMISSIONS {
  LIST = "LIST",
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

export enum COOKIES_APP {
  USER_RES = "USER_RES",
  TOKEN_APP = "TOKEN_APP",
  ROLES_APP = "ROLES_APP",
  PERMISSIONS_APP = "PERMISSIONS_APP",
}

export enum ACTIONS_TITLE_APP {
  SIGN_IN = "Sign In",
  DASHBOARD = "Dashboard",
  USERS = "Users",
  CREATE_USERS = "Create user",
  ROLES = "Roles",
  CREATE_ROLES = "Create role",
  PROJECTS = "Properties",
  MANAGEMENT_COMPANY = "Management Company",
  APARTMENTS = "Apartments",
  CREATE_PROJECTS = "Create properties",
  OVERVIEW_PROJECTS = "Overview properties",
  ACTIVITY_PROJECTS = "Activity properties",
  TASKS_PROJECTS = "Tasks properties",
  CONTRACTOR_PROJECTS = "Contractor properties",
  FILE_PROJECTS = "Files project",
  SETTINGS_PROJECTS = "Settings project",
  TASKS = "Services",
  CREATE_TASKS = "Create task",
  CALENDAR = "Calendar",
  DAILY_CALENDAR = "Daily Calendar",
  REPORTS = "Reports",
  REPORT_CONTRACTORS = "Contractors Report",
  REPORT_RESIDENTIAL = "Residential Report",
  REPORT_CUSTOMERS = "Customers Report",
}

export enum CURRENCY_APP {
  USD = "USD",
  PEN = "PEN",
}

export const months = [
  "Jan",
  "Feb",
  "Marc",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
]

export const monthsSelect = [
  {
    value: "Jan",
    label: "Jan",
  },
  {
    value: "Feb",

    label: "Feb",
  },
  {
    value: "Marc",

    label: "Marc",
  },
  {
    value: "Apr",

    label: "Apr",
  },
  {
    value: "May",

    label: "May",
  },
  {
    value: "June",

    label: "June",
  },
  {
    value: "July",

    label: "July",
  },
  {
    value: "Aug",

    label: "Aug",
  },
  {
    value: "Sept",

    label: "Sept",
  },
  {
    value: "Oct",

    label: "Oct",
  },
  {
    value: "Nov",

    label: "Nov",
  },
  {
    value: "Dec",
    label: "Dec",
  },
]

export enum EOptionsKey {
  PROPERTY_KEY,
  CONTRACTOR_KEY,
  SERVICE_KEY,
}
