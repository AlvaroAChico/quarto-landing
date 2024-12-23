import DashboardIMG from "../../assets/img/icons/grid_view.svg"
import VisitsIMG from "../../assets/img/icons/door_front.svg"
import RentalsIMG from "../../assets/img/icons/key.svg"
import CalendarIMG from "../../assets/img/icons/calendar_month.svg"
import PropertiesIMG from "../../assets/img/icons/home.svg"
import ReferralsIMG from "../../assets/img/icons/group_add.svg"
import WalletIMG from "../../assets/img/icons/payments.svg"
import ProfileIMG from "../../assets/img/icons/person.svg"
import ContactsIMG from "../../assets/img/icons/perm_contact_calendar.svg"
import ChatsIMG from "../../assets/img/icons/chat.svg"
import ProductsIMG from "../../assets/img/icons/info.svg"
import { settingsApp } from "../environment/settings"

interface Route {
  to: string
  basePath: string
  label: string
  icon: any
  visible: boolean
  otherPaths: Object
}

export const pathRoutes = {
  DASHBOARD: {
    to: `/realtor/dashboard`,
    basePath: "/dashboard",
    label: "Dashboard",
    icon: DashboardIMG,
    visible: true,
    otherPaths: {},
  },
  VISITS: {
    to: `/realtor/visitas`,
    basePath: "/visitas",
    label: "Visitas",
    icon: VisitsIMG,
    visible: true,
    otherPaths: {
      VIEW: {
        to: `/realtor/visitas/:id`,
        basePath: "/visitas",
        label: "Crear propiedad",
        visible: false,
      },
    },
  },
  RENTALS: {
    to: `/realtor/alquileres`,
    basePath: "/alquileres",
    label: "Alquileres",
    icon: RentalsIMG,
    visible: true,
    otherPaths: {},
  },
  CALENDAR: {
    to: `/realtor/calendario`,
    basePath: "/calendario",
    label: "Calendario",
    icon: CalendarIMG,
    visible: true,
    otherPaths: {},
  },
  PROPERTY: {
    to: `/realtor/propiedades`,
    basePath: "/propiedades",
    label: "Mis Propiedades",
    icon: PropertiesIMG,
    visible: true,
    otherPaths: {
      CREATE: {
        to: `/realtor/propiedades/crear`,
        basePath: "/propiedades",
        label: "Crear propiedad",
        visible: false,
      },
      EDIT: {
        to: `/realtor/propiedades/editar`,
        basePath: "/propiedades",
        label: "Crear propiedad",
        visible: false,
      },
    },
  },
  REFERRALS: {
    to: `/realtor/referidos`,
    basePath: "/referidos",
    label: "Inq. Referidos",
    icon: ReferralsIMG,
    visible: true,
    otherPaths: {
      CREATE: {
        to: `/realtor/referidos/crear`,
        basePath: "/referidos",
        label: "Añadir Referido",
        visible: false,
      },
    },
  },
  WALLET: {
    to: `/realtor/billetera`,
    basePath: "/billetera",
    label: "Billetera",
    icon: WalletIMG,
    visible: true,
    otherPaths: {},
  },
  PROFILE: {
    to: `/realtor/perfil`,
    basePath: "/perfil",
    label: "Perfil",
    icon: ProfileIMG,
    visible: true,
    otherPaths: {},
  },
  CONTACTS: {
    to: `/realtor/contactos`,
    basePath: "/contactos",
    label: "Contactos",
    icon: ContactsIMG,
    visible: true,
    otherPaths: {},
  },
  CHATS: {
    to: `/realtor/chats`,
    basePath: "/chats",
    label: "Chats",
    icon: ChatsIMG,
    visible: true,
    otherPaths: {},
  },
  INFO_PRODUCTS: {
    to: `/realtor/productos`,
    basePath: "/productos",
    label: "Productos",
    icon: ProductsIMG,
    visible: true,
    otherPaths: {},
  },
  SIGN_IN: {
    to: `/realtor/`,
    basePath: "/",
    label: "Iniciar Sesión",
    icon: "",
    visible: false,
    otherPaths: {},
  },
  RECOVERY_PASS: {
    to: `/realtor/recuperar-contraseña`,
    basePath: "/recuperar-contraseña",
    label: "Recuperar contraseña",
    icon: "",
    visible: false,
    otherPaths: {},
  },
  RESET_PASSWORD: {
    to: `/realtor/resetear-contraseña`,
    basePath: "/resetear-contraseña",
    label: "Resetear contraseña",
    icon: "",
    visible: false,
    otherPaths: {},
  },
}

export const getRoutes = (): Route[] => {
  return Object.values(pathRoutes)
    .filter(rt => rt.visible)
    .map(route => ({
      to: route.to,
      basePath: route.basePath,
      label: route.label,
      icon: route.icon,
      visible: route.visible,
      otherPaths: route.otherPaths,
    }))
}
