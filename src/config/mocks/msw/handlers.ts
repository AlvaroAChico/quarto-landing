import { http, HttpResponse } from "msw"
import SignInJSON from "../features/auth/sign-in.json"
import PropertiesListJSON from "../features/properties/property-list.json"
// VISITS
import VisitsListJSON from "../features/visits/visits-list.json"
import VisitsDetailJSON from "../features/visits/visits-detail.json"
import RentalsListJSON from "../features/rentals/rentals-list.json"
import ReferralsListJSON from "../features/referrals/referrals-list.json"
import MovementsListJSON from "../features/movements/movements-list.json"
import ContactsListJSON from "../features/contacts/contacts-list.json"

import meJSON from "../features/auth/me.json"
import { settingsApp } from "../../environment/settings"

export const handlers = [
  // ******************** AUTH ********************
  http.post(`${settingsApp.api.base}/auth/login`, async ({ request }) => {
    return HttpResponse.json(SignInJSON)
  }),
  http.get(`${settingsApp.api.base}/auth/me`, async ({ request }) => {
    return HttpResponse.json(meJSON)
  }),
  // ******************** VISITS ********************
  http.get(`${settingsApp.api.base}/visits`, () => {
    return HttpResponse.json(VisitsListJSON)
  }),
  http.get(`${settingsApp.api.base}/visits&page=1 `, () => {
    return HttpResponse.json(VisitsListJSON)
  }),
  http.get(`${settingsApp.api.base}/visits/1`, () => {
    return HttpResponse.json(VisitsDetailJSON)
  }),
  // ******************** RENTALS ********************
  http.get(`${settingsApp.api.base}/rentals`, () => {
    return HttpResponse.json(RentalsListJSON)
  }),
  // ******************** REFERRALS ********************
  http.get(`${settingsApp.api.base}/referrals`, () => {
    return HttpResponse.json(ReferralsListJSON)
  }),
  // ******************** PROPERTIES ********************
  http.get(`${settingsApp.api.base}/properties`, () => {
    return HttpResponse.json(PropertiesListJSON)
  }),
  // ******************** MOVEMENTS ********************
  http.get(`${settingsApp.api.base}/movements`, () => {
    console.log("Respondiento ...")
    return HttpResponse.json(MovementsListJSON)
  }),
  // ******************** CONTACTS ********************
  http.get(`${settingsApp.api.base}/contacts`, () => {
    return HttpResponse.json(ContactsListJSON)
  }),
]
