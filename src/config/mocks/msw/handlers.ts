import { http, HttpResponse } from "msw"
import SignInJSON from "../features/auth/sign-in.json"
import UserListJSON from "../features/users/user-list.json"
import UserCreateJSON from "../features/users/user-create.json"
import UserDeleteJSON from "../features/users/user-delete.json"
import RolesListJSON from "../features/roles/role-list.json"
import ProjectsListJSON from "../features/projects/project-list.json"
import meJSON from "../features/auth/me.json"
import { settingsApp } from "../../environment/settings"

export const handlers = [
  http.post(`${settingsApp.api.base}/auth/login`, async ({ request }) => {
    return HttpResponse.json(SignInJSON)
  }),
  http.get(`${settingsApp.api.base}/me`, async ({ request }) => {
    return HttpResponse.json(meJSON)
  }),
  // ******** USERS ********
  http.get(`${settingsApp.api.base}/users`, () => {
    return HttpResponse.json(UserListJSON)
  }),
  http.post(`${settingsApp.api.base}/users/create`, async ({ request }) => {
    return HttpResponse.json(UserCreateJSON)
  }),
  http.post(`${settingsApp.api.base}/users/delete/1`, async ({ request }) => {
    return HttpResponse.json(UserDeleteJSON)
  }),
  // ******** ROLES ********
  http.get(`${settingsApp.api.base}/roles`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  // ******** PROJECTS ********
  http.get(`${settingsApp.api.base}/projects`, () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
]
