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
  HOME: {
    to: `/`,
    basePath: "/home",
    label: "Dashboard",
    icon: DashboardIMG,
    visible: true,
    otherPaths: {},
  },
  VERIFY_EMAIL: {
    to: `/verify-email`,
    basePath: "/verify-email",
    label: "Verify Email",
    icon: DashboardIMG,
    visible: true,
    otherPaths: {},
  },
  PROPERTY: {
    to: `/propiedades`,
    basePath: "/propiedades",
    label: "Mis Propiedades",
    icon: PropertiesIMG,
    visible: true,
    otherPaths: {
      DETAIL: {
        to: `/propiedades/:id`,
        basePath: "/propiedades",
        label: "Detalle de propiedad",
        visible: false,
      },
      SCHEDULE: {
        to: `/propiedades/:id/schedule`,
        basePath: "/propiedades",
        label: "Agendar visita de propiedad",
        visible: false,
      },
      CREATE: {
        to: `/propiedades/crear`,
        basePath: "/propiedades",
        label: "Crear propiedad",
        visible: false,
      },
    },
  },
  PROFILE: {
    to: `/perfil`,
    basePath: "/perfil",
    label: "Perfil",
    icon: ProfileIMG,
    visible: true,
    otherPaths: {},
  },
  REGISTER: {
    to: `/register`,
    basePath: "/register",
    label: "Registro",
    icon: "",
    visible: false,
    otherPaths: {
      COMPLETE_REGISTER: {
        to: `/register/verify/:id`,
        basePath: "/register",
        label: "Completar registro",
        visible: false,
      },
    },
  },
  SIGN_IN: {
    to: `/sign-in`,
    basePath: "/sign-in",
    label: "Iniciar Sesión",
    icon: "",
    visible: false,
    otherPaths: {
      VERIFY: {
        to: `/login/:id`,
        basePath: "/login",
        label: "Verificar Email",
        visible: false,
      },
    },
  },
  RECOVERY_PASS: {
    to: `/recuperar-contraseña`,
    basePath: "/recuperar-contraseña",
    label: "Recuperar contraseña",
    icon: "",
    visible: false,
    otherPaths: {},
  },
  RESET_PASSWORD: {
    to: `/resetear-contraseña`,
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
