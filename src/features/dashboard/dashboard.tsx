import React, { useState, useEffect } from "react"
import { ContainerDashboard } from "./dashboard.styles"
import StadisticsCard from "./components/stadistics-card"
import useDataUser from "../../utils/use-data-user"
import { APP_MENU } from "../../constants/app"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/paths"
import {
  FilterPermissionsDTO,
  UserDTO,
} from "../../core/models/interfaces/user-model"
import { setErrResponse } from "../../utils/erros-util"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { InfoCalendarDTO } from "../../core/models/interfaces/calendar-model"

// El componente Dashboard
const Dashboard: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // const storedToken = handleGetToken()
    // if (!storedToken) {
    //   clearAllDataAPP()
    //   navigate(pathRoutes.SIGN_IN)
    // }
    // const data = handleGetPermissions()
    // setDataPermissions(data)
    // if (!!data && !data?.dashboard.includes(APP_MENU.LIST)) {
    //   return
    // }
  }, [])

  const [nroProperties, setNroProperties] = React.useState<number>(0)
  const [nroContractors, setNroContractors] = React.useState<number>(0)
  const [nroWorks, setNroWorks] = React.useState<number>(0)

  const fetchData = async (url: string) => {
    const storedToken = handleGetToken()
    if (!storedToken) {
      throw new Error("No token found")
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      return response.data
    } catch (err) {
      setErrResponse(err)
      throw err
    }
  }

  const fetchDataResidentials = async () => {
    try {
      const data: PropertyDTO[] = await fetchData(
        `${settingsApp.api.base}/residentials`,
      )
      setNroProperties(data.length)
    } catch (err) {
      setErrResponse(err)
    }
  }

  const getDataCalendar = React.useCallback(async () => {
    const data = handleGetPermissions()
    try {
      const data: InfoCalendarDTO[] = await fetchData(
        `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status`,
      )
      setNroWorks(data.length)
    } catch (err) {
      setErrResponse(err)
    }
  }, [dataPermissions])

  const fetchDataContractors = async () => {
    try {
      const data: UserDTO[] = await fetchData(
        `${settingsApp.api.base}/users?include=role`,
      )
      const listUsers = (data || [])
        .map(user => {
          if (
            user.role.length > 0 &&
            user.role.some(role => role.name.toLowerCase() === "contractor")
          ) {
            return {
              value: user.id,
              label: `${user.firstName} ${user.lastName}`,
            }
          }
        })
        .filter(us => us != undefined)
      setNroContractors(listUsers.length)
    } catch (err) {
      setErrResponse(err)
    }
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([
        getDataCalendar(),
        fetchDataResidentials(),
        fetchDataContractors(),
      ])
    }

    fetchDataAsync()
  }, [])

  return (
    <ContainerDashboard>
      <StadisticsCard data={nroProperties} label="Residentials" />
      <StadisticsCard data={nroContractors} label="Contractors" />
      <StadisticsCard data={nroWorks} label="Works" />
    </ContainerDashboard>
  )
}

export default Dashboard
