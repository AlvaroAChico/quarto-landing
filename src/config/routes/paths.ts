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
  children: any[]
}

export const pathRoutes = {
  PROPERTY: {
    to: "/propiedades",
    basePath: "/propiedades",
    label: "Propiedades",
    icon: Home,
    visible: true,
    children: [],
  },
  CREATE_PROPERTY: {
    to: "/crear-propiedad",
    basePath: "/crear-propiedad",
    label: "Subir propiedad",
    icon: Home,
    visible: false,
    children: [],
  },
  VISITS: {
    to: "/visitas",
    basePath: "/visitas",
    label: "Visitas",
    icon: DoorClosed,
    visible: true,
    children: [],
  },
  RENTALS: {
    to: "/alquileres",
    basePath: "/alquileres",
    label: "Alquileres",
    icon: Key,
    visible: true,
    children: [],
  },
  CALENDAR: {
    to: "/calendario",
    basePath: "/calendario",
    label: "Calendario",
    icon: Calendar,
    visible: true,
    children: [],
  },
  WINNINGS: {
    to: "/ganancias",
    basePath: "/ganancias",
    label: "Ganancias",
    icon: Money,
    visible: true,
    children: [],
  },
  PROFILE: {
    to: "/perfil",
    basePath: "/perfil",
    label: "Mi perfil",
    icon: User,
    visible: true,
    children: [],
  },
  INFO: {
    to: "/info",
    basePath: "/info",
    label: "Info",
    icon: Info,
    visible: true,
    children: [],
  },
  SIGN_IN: {
    to: "/",
    basePath: "/",
    label: "Iniciar Sesión",
    icon: Home,
    visible: false,
    children: [],
  },
  RECOVERY_PASS: {
    to: "/recuperar-contraseña",
    basePath: "/recuperar-contraseña",
    label: "Recuperar contraseña",
    icon: "",
    visible: false,
    children: [],
  },
  RESET_PASSWORD: {
    to: "/resetear-contraseña",
    basePath: "/resetear-contraseña",
    label: "Resetear contraseña",
    icon: "",
    visible: false,
    children: [],
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
      children: route.children,
    }))
}
