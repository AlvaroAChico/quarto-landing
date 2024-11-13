import { http, HttpResponse } from "msw"
import SignInJSON from "../features/auth/sign-in.json"
import PropertiesListJSON from "../features/properties/property-list.json"
import VisitsListJSON from "../features/visits/visits-list.json"

import meJSON from "../features/auth/me.json"
import { settingsApp } from "../../environment/settings"

export const handlers = [
  // ******************** AUTH ********************
  http.post(`${settingsApp.api.base}/auth/login`, async ({ request }) => {
    return HttpResponse.json(SignInJSON)
  }),
  // http.get(`${settingsApp.api.base}/auth/me`, async ({ request }) => {
  //   return HttpResponse.json(meJSON)
  // }),
  // ******************** VISITS ********************
  http.get(`${settingsApp.api.base}/visits`, () => {
    return HttpResponse.json(VisitsListJSON)
  }),
  // ******************** PROPERTIES ********************
  http.get(`${settingsApp.api.base}/properties`, () => {
    return HttpResponse.json(PropertiesListJSON)
  }),
]
