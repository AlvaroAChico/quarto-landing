import { Home } from "@styled-icons/feather/Home"
import { DoorClosed } from "@styled-icons/bootstrap/DoorClosed"
import { Key } from "@styled-icons/bootstrap/Key"
import { Calendar } from "@styled-icons/ionicons-outline/Calendar"
import { Money } from "@styled-icons/fluentui-system-regular/Money"
import { User } from "@styled-icons/fa-regular/User"
import { Info } from "@styled-icons/fluentui-system-regular/Info"

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
    to: "/dashboard",
    basePath: "/dashboard",
    label: "Dashboard",
    icon: DoorClosed,
    visible: true,
    otherPaths: {},
  },
  VISITS: {
    to: "/visitas",
    basePath: "/visitas",
    label: "Visitas",
    icon: DoorClosed,
    visible: true,
    otherPaths: {},
  },
  RENTALS: {
    to: "/alquileres",
    basePath: "/alquileres",
    label: "Alquileres",
    icon: Key,
    visible: true,
    otherPaths: {},
  },
  PROPERTY: {
    to: "/propiedades",
    basePath: "/propiedades",
    label: "Mis Propiedades",
    icon: Home,
    visible: true,
    otherPaths: {
      CREATE: {
        to: "/propiedades/crear",
        basePath: "/propiedades",
        label: "Crear propiedad",
        visible: false,
      },
      EDIT: {
        to: "/propiedades/editar",
        basePath: "/propiedades",
        label: "Crear propiedad",
        visible: false,
      },
    },
  },
  REFERRALS: {
    to: "/referidos",
    basePath: "/referidos",
    label: "Inquilinos Referidos",
    icon: Key,
    visible: true,
    otherPaths: {},
  },
  CONTACTS: {
    to: "/contactos",
    basePath: "/contactos",
    label: "Contactos",
    icon: Key,
    visible: true,
    otherPaths: {},
  },
  CALENDAR: {
    to: "/calendario",
    basePath: "/calendario",
    label: "Calendario",
    icon: Calendar,
    visible: true,
    otherPaths: {},
  },
  WINNINGS: {
    to: "/ganancias",
    basePath: "/ganancias",
    label: "Ganancias",
    icon: Money,
    visible: true,
    otherPaths: {},
  },
  PROFILE: {
    to: "/perfil",
    basePath: "/perfil",
    label: "Mi perfil",
    icon: User,
    visible: true,
    otherPaths: {},
  },
  INFO: {
    to: "/info",
    basePath: "/info",
    label: "Info",
    icon: Info,
    visible: true,
    otherPaths: {},
  },
  SIGN_IN: {
    to: "/",
    basePath: "/",
    label: "Iniciar Sesión",
    icon: Home,
    visible: false,
    otherPaths: {},
  },
  RECOVERY_PASS: {
    to: "/recuperar-contraseña",
    basePath: "/recuperar-contraseña",
    label: "Recuperar contraseña",
    icon: "",
    visible: false,
    otherPaths: {},
  },
  RESET_PASSWORD: {
    to: "/resetear-contraseña",
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
