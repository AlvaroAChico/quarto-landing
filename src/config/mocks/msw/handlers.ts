import { http, HttpResponse } from "msw"
import SignInJSON from "../sign-in.json"
import UserListJSON from "../users-list.json"
import RolesListJSON from "../roles-list.json"
import ProjectsListJSON from "../projects-list.json"
import meJSON from "../me.json"

export const handlers = [
  http.post("http://localhost:3000/auth/login", async ({ request }) => {
    return HttpResponse.json(SignInJSON)
  }),
  http.get("http://localhost:3000/me", async ({ request }) => {
    return HttpResponse.json(meJSON)
  }),
  http.get("http://localhost:3000/users", () => {
    return HttpResponse.json(UserListJSON)
  }),
  http.get("http://localhost:3000/roles", () => {
    return HttpResponse.json(RolesListJSON)
  }),
  http.get("http://localhost:3000/projects", () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
]
