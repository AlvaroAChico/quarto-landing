export enum APP_CONSTANS {
  PENDING_APP = "PENDING_APP",
}

export enum APP_MENU {
  MENU_USERS = "Usuarios",
  MENU_ROLES = "Roles",
  MENU_PERMISSIONS = "Permisos",
  MENU_PROJECTS = "Proyectos",
  MENU_TASKS = "Tareas",
  MENU_CALENDAR = "Calendario",
  MENU_REPORTS = "Reportes",
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
  PROJECTS = "Residentials",
  CREATE_PROJECTS = "Create residential",
  OVERVIEW_PROJECTS = "Overview residential",
  ACTIVITY_PROJECTS = "Activity residential",
  TASKS_PROJECTS = "Tasks residential",
  CONTRACTOR_PROJECTS = "Contractor residential",
  FILE_PROJECTS = "Files project",
  SETTINGS_PROJECTS = "Settings project",
  TASKS = "Services",
  CREATE_TASKS = "Create task",
  CALENDAR = "Calendar",
  REPORTS = "Reports",
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
