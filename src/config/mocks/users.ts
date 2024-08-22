import { User } from "../../core/models/interfaces/user-model"

export const mockUsersPermissions: User[] = [
  {
    id: "1",
    name: "Steve Robinson",
    allUsers: true,
    permissions: [
      {
        name: "MENU_USERS",
        permissions: ["LIST", "CREATE", "UPDATE", "DELETE"],
      },
      {
        name: "MENU_ROLES",
        permissions: ["LIST"],
      },
      {
        name: "MENU_PERMISSIONS",
        permissions: ["LIST", "UPDATE", "DELETE"],
      },
      {
        name: "MENU_PROJECTS",
        permissions: ["LIST", "CREATE"],
      },
      {
        name: "MENU_TASKS",
        permissions: ["LIST", "CREATE", "UPDATE"],
      },
      {
        name: "MENU_CALENDAR",
        permissions: ["LIST"],
      },
      {
        name: "MENU_REPORTS",
        permissions: ["LIST"],
      },
    ],
  },
  {
    id: "2",
    name: "Joe Doe",
    allUsers: true,
    permissions: [
      {
        name: "MENU_USERS",
        permissions: ["LIST"],
      },
      {
        name: "MENU_ROLES",
        permissions: ["LIST"],
      },
      {
        name: "MENU_PERMISSIONS",
        permissions: ["LIST"],
      },
      {
        name: "MENU_PROJECTS",
        permissions: ["LIST", "CREATE"],
      },
      {
        name: "MENU_TASKS",
        permissions: ["LIST", "CREATE", "UPDATE"],
      },
      {
        name: "MENU_CALENDAR",
        permissions: ["LIST"],
      },
      {
        name: "MENU_REPORTS",
        permissions: ["LIST"],
      },
    ],
  },
  {
    id: "3",
    name: "Peter Sans",
    allUsers: false,
    permissions: [
      {
        name: "MENU_USERS",
        permissions: [],
      },
      {
        name: "MENU_ROLES",
        permissions: [],
      },
      {
        name: "MENU_PERMISSIONS",
        permissions: [],
      },
      {
        name: "MENU_PROJECTS",
        permissions: ["LIST"],
      },
      {
        name: "MENU_TASKS",
        permissions: ["LIST", "CREATE", "UPDATE", "DELETE"],
      },
      {
        name: "MENU_CALENDAR",
        permissions: ["LIST"],
      },
      {
        name: "MENU_REPORTS",
        permissions: ["LIST"],
      },
    ],
  },
]
