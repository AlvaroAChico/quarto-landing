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
}

export enum COOKIES_APP {
  USER_RES = "USER_RES",
  TOKEN_APP = "TOKEN_APP",
  ROLES_APP = "ROLES_APP",
}

export enum ACTIONS_TITLE_APP {
  SIGN_IN = "Sign In",
  PROPERTIES = "Propiedades",
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

export enum ETypeParam {
  NUMBER = "number",
  CHECKBOX = "checkbox",
}

export const listSteppersProperty = [
  {
    step: 1,
    name: "Operación",
  },
  {
    step: 2,
    name: "Datos del inmueble",
  },
  {
    step: 3,
    name: "Cond. de Pago",
  },
  {
    step: 4,
    name: "Características",
  },
  {
    step: 5,
    name: "Fotos",
  },
]

export const optionsTypesDocument = [
  {
    value: "Cédula", // Cedula V
    label: "Cédula",
  },
  {
    value: "Pasaporte", //Pasaporte PA
    label: "Pasaporte",
  },
  {
    value: "Carnet de Extranjeria", //Carnet de Extranjeria CE
    label: "Carnet de Extranjeria",
  },
]

export enum ETypeModeSearch {
  ALQUILAR = "ALQUILAR",
  VENTA = "VENTA",
}

export enum EStepRegister {
  NONE = "NONE",
  WELCOME = "WELCOME",
  SELECT_INTEREST = "SELECT_INTEREST",
  SIGN_IN = "SIGN_IN",
  SIGN_IN_INFO = "SIGN_IN_INFO",
  BUY = "BUY",
  REGISTER_COMPLETE = "REGISTER_COMPLETE",
  VERIFY_EMAIL = "VERIFY_EMAIL",
  CHECK_EMAIL_SIGNIN = "CHECK_EMAIL_SIGNIN",
  // FLUJO CREAR CUENTA
  REGISTER = "REGISTER",
  REGISTER_INFO = "REGISTER_INFO",
  CHECK_EMAIL_CREATE = "CHECK_EMAIL_CREATE",
  REGISTER_INFO_NEXT = "REGISTER_INFO_NEXT",
}

export const globalParams = [
  {
    id: 1,
    name: "Piso #",
    type: "number",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 3,
    name: "Habitaciones",
    type: "number",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 4,
    name: "Baños",
    type: "number",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 5,
    name: "Puestos",
    type: "number",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 6,
    name: "Lavandero",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 7,
    name: "m2",
    type: "number",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 8,
    name: "Aceptan Mascotas",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 9,
    name: "Amoblado",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 10,
    name: "Piscina",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 11,
    name: "Gimnasio",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 12,
    name: "Ascensor",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 13,
    name: "Vigilancia 24H",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 14,
    name: "Pozo de agua",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 15,
    name: "Planta eléctrica",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 16,
    name: "Internet",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
  {
    id: 17,
    name: "Aire acondicionado",
    type: "checkbox",
    isActive: true,
    createdAt: "2025-03-17 12:08:03",
  },
]
