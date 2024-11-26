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
    icon: DashboardIMG,
    visible: true,
    otherPaths: {},
  },
  VISITS: {
    to: "/visitas",
    basePath: "/visitas",
    label: "Visitas",
    icon: VisitsIMG,
    visible: true,
    otherPaths: {
      VIEW: {
        to: "/visitas/:id",
        basePath: "/visitas",
        label: "Crear propiedad",
        visible: false,
      },
    },
  },
  RENTALS: {
    to: "/alquileres",
    basePath: "/alquileres",
    label: "Alquileres",
    icon: RentalsIMG,
    visible: true,
    otherPaths: {},
  },
  CALENDAR: {
    to: "/calendario",
    basePath: "/calendario",
    label: "Calendario",
    icon: CalendarIMG,
    visible: true,
    otherPaths: {},
  },
  PROPERTY: {
    to: "/propiedades",
    basePath: "/propiedades",
    label: "Mis Propiedades",
    icon: PropertiesIMG,
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
    label: "Inq. Referidos",
    icon: ReferralsIMG,
    visible: true,
    otherPaths: {
      CREATE: {
        to: "/referidos/crear",
        basePath: "/referidos",
        label: "Añadir Referido",
        visible: false,
      },
    },
  },
  WALLET: {
    to: "/billetera",
    basePath: "/billetera",
    label: "Billetera",
    icon: WalletIMG,
    visible: true,
    otherPaths: {},
  },
  PROFILE: {
    to: "/perfil",
    basePath: "/perfil",
    label: "Perfil",
    icon: ProfileIMG,
    visible: true,
    otherPaths: {},
  },
  CONTACTS: {
    to: "/contactos",
    basePath: "/contactos",
    label: "Contactos",
    icon: ContactsIMG,
    visible: true,
    otherPaths: {},
  },
  CHATS: {
    to: "/chats",
    basePath: "/chats",
    label: "Chats",
    icon: ChatsIMG,
    visible: true,
    otherPaths: {},
  },
  INFO_PRODUCTS: {
    to: "/productos",
    basePath: "/productos",
    label: "Productos",
    icon: ProductsIMG,
    visible: true,
    otherPaths: {},
  },
  SIGN_IN: {
    to: "/",
    basePath: "/",
    label: "Iniciar Sesión",
    icon: "",
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
