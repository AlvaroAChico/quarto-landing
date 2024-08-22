import { http, HttpResponse } from "msw"
import SignInJSON from "../sign-in.json"
import UserListJSON from "../user-list.json"
import UserCreateJSON from "../user-create.json"
import RolesListJSON from "../role-list.json"
import ProjectsListJSON from "../project-list.json"
import meJSON from "../me.json"

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
    console.log("User create -> ", request)
    return HttpResponse.json(UserCreateJSON)
  }),
  http.post("http://localhost:3000/users/delete/1", async ({ request }) => {
    console.log("User create -> ", request)
    return HttpResponse.json(UserCreateJSON)
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
