import { http, HttpResponse } from "msw"
import SignInJSON from "../features/auth/sign-in.json"
import UserListJSON from "../features/users/user-list.json"
import UserCreateJSON from "../features/users/user-create.json"
import UserDeleteJSON from "../features/users/user-delete.json"
import RolesListJSON from "../features/roles/role-list.json"
import ProjectsListJSON from "../features/projects/project-list.json"
import ProjectFilterIdJSON from "../features/projects/project-filter-id.json"
import ProjectFileByIdJSON from "../features/project-files/project-file-id.json"
import PermissionsListJSON from "../features/permissions/permission-list.json"
import StadisticsJSON from "../features/projects/stadistics/stadistics.json"
import ServiceDataJSON from "../features/services/service-data.json"
import ResidentialReportSON from "../features/report/residential-report.json"
import ContractorReportSON from "../features/report/contractor-report.json"

import meJSON from "../features/auth/me.json"
import { settingsApp } from "../../environment/settings"

export const handlers = [
  http.post(`${settingsApp.api.base}/auth/login`, async ({ request }) => {
    return HttpResponse.json(SignInJSON)
  }),
  http.get(`${settingsApp.api.base}/auth/me`, async ({ request }) => {
    return HttpResponse.json(meJSON)
  }),
  // ******** USERS ********
  http.get(`${settingsApp.api.base}/users`, () => {
    return HttpResponse.json(UserListJSON)
  }),
  http.get(`${settingsApp.api.base}/users/1`, async ({ request }) => {
    return HttpResponse.json(UserCreateJSON)
  }),
  http.get(
    `${settingsApp.api.base}/users?include=role`,
    async ({ request }) => {
      return HttpResponse.json(UserCreateJSON)
    },
  ),
  http.post(`${settingsApp.api.base}/users`, async ({ request }) => {
    return HttpResponse.json({
      message: "user was created successfully",
    })
  }),
  http.patch(`${settingsApp.api.base}/users/1`, async ({ request }) => {
    return HttpResponse.json(UserDeleteJSON)
  }),
  http.delete(`${settingsApp.api.base}/users/1`, async ({ request }) => {
    return HttpResponse.json({ message: "user was removed successfully" })
  }),
  // ******** ROLES ********
  http.get(`${settingsApp.api.base}/roles`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  http.get(`${settingsApp.api.base}/roles/1`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  http.get(`${settingsApp.api.base}/roles?include=permissions`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  http.post(`${settingsApp.api.base}/roles`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  http.patch(`${settingsApp.api.base}/roles/1`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  http.delete(`${settingsApp.api.base}/roles/1`, () => {
    return HttpResponse.json(RolesListJSON)
  }),
  // ******** PROJECTS ********
  http.get(`${settingsApp.api.base}/projects`, () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
  http.post(`${settingsApp.api.base}/projects`, () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
  http.get(`${settingsApp.api.base}/projects?include=tasks,client`, () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
  http.get(`${settingsApp.api.base}/projects/1?include=tasks`, () => {
    return HttpResponse.json(ProjectsListJSON)
  }),
  http.get(`${settingsApp.api.base}/project-files?filter[id]=1`, () => {
    return HttpResponse.json(ProjectFileByIdJSON)
  }),
  http.get(
    `${settingsApp.api.base}/projects?include=tasks&filter[id]=1`,
    () => {
      return HttpResponse.json(ProjectFilterIdJSON)
    },
  ),
  // ******** PERMISSIONS ********
  http.get(`${settingsApp.api.base}/permissions`, () => {
    return HttpResponse.json(PermissionsListJSON)
  }),
  // ******** CONTRACTORS ********
  http.get(
    `${settingsApp.api.base}/contractors?include=user&filter[id]=1`,
    () => {
      return HttpResponse.json(ProjectsListJSON)
    },
  ),
  // ******** CLIENTS ********
  http.get(`${settingsApp.api.base}/clients`, () => {
    return HttpResponse.json(ProjectsListJSON)
  }),

  // ******** STADISTICS ********
  http.get(`${settingsApp.api.base}/stadistics`, () => {
    return HttpResponse.json(StadisticsJSON)
  }),
  http.get(`${settingsApp.api.base}/services`, () => {
    return HttpResponse.json(ServiceDataJSON)
  }),
  // ******** REPORTS ********
  http.get(`${settingsApp.api.base}/residentials/report`, () => {
    return HttpResponse.json(ResidentialReportSON)
  }),

  http.get(`${settingsApp.api.base}/contractors/report`, () => {
    return HttpResponse.json(ContractorReportSON)
  }),


]
