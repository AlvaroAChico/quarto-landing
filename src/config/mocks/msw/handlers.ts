import { http, HttpResponse } from "msw"
import SignInJSON from "../features/auth/sign-in.json"
import UserListJSON from "../features/users/user-list.json"
import UserCreateJSON from "../features/users/user-create.json"
import UserDeleteJSON from "../features/users/user-delete.json"
import RolesListJSON from "../features/roles/role-list.json"
import ProjectsListJSON from "../features/projects/project-list.json"
import meJSON from "../features/auth/me.json"

export const handlers = [
  http.post("http://localhost:3000/auth/login", async ({ request }) => {
    return HttpResponse.json(SignInJSON)
  }),
  http.get("http://localhost:3000/me", async ({ request }) => {
    return HttpResponse.json(meJSON)
  }),
  // ******** USERS ********
  http.get("http://localhost:3000/users", () => {
    return HttpResponse.json(UserListJSON)
  }),
  http.post("http://localhost:3000/users/create", async ({ request }) => {
    return HttpResponse.json(UserCreateJSON)
  }),
  http.post("http://localhost:3000/users/delete/1", async ({ request }) => {
    return HttpResponse.json(UserDeleteJSON)
  }),
  // ******** ROLES ********
  http.get("http://localhost:3000/roles", () => {
    return HttpResponse.json(RolesListJSON)
  }),
  // ******** PROJECTS ********
  http.get("http://localhost:3000/projects", () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
]
