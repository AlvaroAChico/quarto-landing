import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../config/routes/paths"
import {
  CardInfoReport,
  ContainerBodyScrool,
  ContainerFilterBody,
  ContainerResidentialReport,
  ContainerResidentialReportBody,
  ContainerResidentialReportHeader,
  ContainerTopList,
} from "./property-report.styles"
import Select from "react-select"
import {
  ContainerBody,
  ContainerHead,
  ContainerTable,
  selectStyles,
  WrapperInput,
} from "../../../config/theme/global-styles"
import Input from "../../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Skeleton from "react-loading-skeleton"
import { APP_MENU, monthsSelect } from "../../../constants/app"
import {
  ApartmentDTO,
  PropertyDTO,
  ResidentialReportDTO,
  WorksDTO,
} from "../../../core/models/interfaces/property-model"
import axios from "axios"
import { settingsApp } from "../../../config/environment/settings"
import {
  FilterPermissionsDTO,
  UserDTO,
} from "../../../core/models/interfaces/user-model"
import useDataUser from "../../../utils/use-data-user"
import {
  InfoCalendarDTO,
  InfoReportDTO,
} from "../../../core/models/interfaces/calendar-model"
import { setErrResponse } from "../../../utils/erros-util"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"
import { ServiceDTO } from "../../../core/models/interfaces/roles-model"

const ResidentialReport: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verify Token
    const storedToken = handleGetToken()
    if (!storedToken) {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
    // Verify Permissions
    const data = handleGetPermissions()
    setDataPermissions(data)
    if (!!data && !data?.reports.includes(APP_MENU.LIST)) {
      return
    }
  }, [])

  const [nroProperties, setNroProperties] = React.useState<number>(0)
  const [nroApartments, setNroApartments] = React.useState<number>(0)
  const [nroContractors, setNroContractors] = React.useState<number>(0)
  const [infoReport, setInfoReport] = React.useState<InfoReportDTO[]>([])
  const [nroWorks, setNroWorks] = React.useState<number>(0)
  const [daySelected, setDaySelected] = React.useState<any>(new Date())

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

  // const getDataCalendar = React.useCallback(async () => {
  //   const data = handleGetPermissions()
  //   try {
  //     const data: InfoCalendarDTO[] = await fetchData(
  //       `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status`,
  //     )
  //     setNroWorks(data.length)
  //     // setInfoReport()
  //   } catch (err) {
  //     setErrResponse(err)
  //   }
  // }, [dataPermissions])

  const getDataCalendar = React.useCallback(async () => {
    try {
      const data: InfoCalendarDTO[] = await fetchData(
        `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status`,
      )

      // // Crear un objeto para almacenar información por residential
      // const residentialInfo: {
      //   [key: number]: {
      //     name: string
      //     totalApartments: number
      //     totalWorks: number
      //     completedWorks: number
      //     activeWorks: number
      //   }
      // } = {}

      // // Crear un conjunto para almacenar los IDs de apartamentos
      // const apartmentIds: Set<number> = new Set()

      // data.forEach(work => {
      //   const residentialId = work.residential.id

      //   // Crear entrada si no existe
      //   if (!residentialInfo[residentialId]) {
      //     residentialInfo[residentialId] = {
      //       name: work.residential.name,
      //       totalApartments: 0,
      //       totalWorks: 0,
      //       completedWorks: 0,
      //       activeWorks: 0,
      //     }
      //   }

      //   // Contar trabajos
      //   residentialInfo[residentialId].totalWorks += 1

      //   // Contar trabajos completados y activos
      //   if (work.status.id === 3) {
      //     residentialInfo[residentialId].completedWorks += 1
      //   } else if (work.status.id === 1) {
      //     residentialInfo[residentialId].activeWorks += 1
      //   }

      //   // Agregar el ID del apartamento a la colección de apartamentos
      //   apartmentIds.add(work.apartment.id) // Asegúrate de que el objeto `apartment` tenga la propiedad `id`
      // })

      // // Asignar el total de apartamentos a cada residencial
      // Object.keys(residentialInfo).forEach(key => {
      //   residentialInfo[parseInt(key)].totalApartments = apartmentIds.size // Contar cuántos apartamentos únicos hay
      // })

      // // Ahora configurar el infoReport de acuerdo a la información recolectada
      // const infoReportData = Object.keys(residentialInfo).map(
      //   (key: string) => ({
      //     residentialId: key,
      //     ...residentialInfo[parseInt(key)],
      //   }),
      // )

      // setInfoReport(infoReportData)
      // setNroWorks(data.length)
      // New Reports

      // Crear un objeto para almacenar info por residential con propiedades y trabajos
      const resInfo: {
        [key: number]: {
          id: number
          name: string
          apartments: ApartmentDTO[]
          works: WorksDTO[]
        }
      } = {}

      data.forEach(work => {
        const residentialId = work.residential.id

        // Crear entrada si no existe
        if (!resInfo[residentialId]) {
          resInfo[residentialId] = {
            id: residentialId,
            name: work.residential.name,
            apartments: [],
            works: [],
          }
        }
        // Agregar apartamentos (si no están ya en la lista)
        const apartment: ApartmentDTO = {
          id: work.apartment.id,
          name: work.apartment.name,
          code: work.apartment.code,
        } as ApartmentDTO
        if (
          !resInfo[residentialId].apartments.some(ap => ap.id === apartment.id)
        ) {
          resInfo[residentialId].apartments.push(apartment)
        }

        // Agregar el trabajo a la lista de trabajos de este residential
        resInfo[residentialId].works.push({
          id: work.id,
          startDate: work.startDate,
          endDate: work.endDate,
          serviceId: work.service.id,
          statusId: work.status.id,
          contractorId: work.contractor.id,
          customerNotes: work.customerNotes,
        } as WorksDTO)
      })

      // Convertir el objeto a una lista
      const infoReport = Object.values(resInfo)

      setInfoReport(infoReport)
    } catch (err) {
      setErrResponse(err)
    }
  }, [dataPermissions])

  const fetchDataResidentials = async () => {
    try {
      const data: PropertyDTO[] = await fetchData(
        `${settingsApp.api.base}/residentials?include=apartments`,
      )

      const totalApartments = data.reduce((acc, residential) => {
        return (
          acc + (residential.apartments ? residential.apartments.length : 0)
        )
      }, 0)

      setNroProperties(data.length)
      setNroApartments(totalApartments)
    } catch (err) {
      setErrResponse(err)
    }
  }

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

  const renderMonthContent = (
    month: any,
    shortMonth: any,
    longMonth: any,
    day: any,
  ) => {
    const fullYear = new Date(day).getFullYear()
    const tooltipText = `Tooltip for month: ${longMonth} ${fullYear}`

    return <span title={tooltipText}>{shortMonth}</span>
  }

  // Services
  const [optionsServices, setOptionsServices] = React.useState<any>([])
  const [selectedOptionServices, setSelectedOptionServices] =
    React.useState<any>(null)

  const handleChangeOptionService = (value: any) => {
    setSelectedOptionServices(value)
  }
  React.useEffect(() => {
    const storedToken = handleGetToken()
    axios
      .get(`${settingsApp.api.base}/services`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(response => {
        const listData: ServiceDTO[] = response.data as ServiceDTO[]
        const listServices = (listData || []).map(data => ({
          value: data.id,
          label: data.name,
        }))
        setOptionsServices(listServices.filter((role: any) => !!role))
      })
  }, [])

  return (
    <ContainerResidentialReport>
      <ContainerResidentialReportHeader>
        <CardInfoReport>
          <h1> {nroProperties}</h1>
          <span>Residentials</span>
        </CardInfoReport>
        <CardInfoReport>
          <h1> {nroApartments}</h1>
          <span>Apartaments</span>
        </CardInfoReport>
      </ContainerResidentialReportHeader>
      <ContainerResidentialReportBody>
        <ContainerFilterBody>
          <ContainerTable>
            <ContainerTopList>
              <DatePicker
                id="date-create-apartment"
                showIcon
                selected={daySelected}
                icon={<Calendar4 />}
                toggleCalendarOnIconClick
                onChange={(date: any) => {
                  setDaySelected(date)
                }}
                placeholderText="Enter date"
                popperClassName="some-custom-class"
                popperPlacement="top-end"
                renderMonthContent={renderMonthContent}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                popperModifiers={[
                  {
                    name: "myModifier",
                    fn(state) {
                      return state
                    },
                  },
                ]}
              />
              <Select
                defaultValue={selectedOptionServices}
                onChange={handleChangeOptionService}
                options={optionsServices}
                isSearchable={false}
                styles={selectStyles}
              />
            </ContainerTopList>

            <table>
              <ContainerHead>
                <tr>
                  <td>Name</td>
                  <td>Number of apartments</td>
                  <td>Pending services</td>
                  <td>Services in progress</td>
                  <td>Services completed</td>
                  <td />
                </tr>
              </ContainerHead>

              <ContainerBodyScrool>
                {infoReport.map(res => {
                  return (
                    <tr className="tr" key={Date.now()}>
                      <td>
                        <span>{res.name}</span>
                      </td>
                      <td>
                        <span>{res.apartments.length}</span>
                      </td>
                      <td>
                        <span>
                          {
                            res.works
                              .filter(w => {
                                if (!!selectedOptionServices) {
                                  if (
                                    w.serviceId == selectedOptionServices.value
                                  ) {
                                    return w
                                  } else {
                                    return null
                                  }
                                }
                                return w
                              })
                              .filter(
                                wrk =>
                                  wrk.startDate.split("-")[1] ===
                                  daySelected
                                    .toLocaleDateString("es-ES")
                                    .split("/")[1],
                              )
                              .filter(
                                wk =>
                                  wk.statusId == 1 ||
                                  wk.statusId == 2 ||
                                  wk.statusId == 3 ||
                                  wk.statusId == 4,
                              ).length
                          }
                        </span>
                      </td>
                      <td>
                        <span>
                          {
                            res.works
                              .filter(
                                wrk =>
                                  wrk.startDate.split("-")[1] ===
                                  daySelected
                                    .toLocaleDateString("es-ES")
                                    .split("/")[1],
                              )
                              .filter(
                                wk => wk.statusId == 8 || wk.statusId == 9,
                              ).length
                          }
                        </span>
                      </td>
                      <td>
                        <span>
                          {
                            res.works
                              .filter(
                                wrk =>
                                  wrk.startDate.split("-")[1] ===
                                  daySelected
                                    .toLocaleDateString("es-ES")
                                    .split("/")[1],
                              )
                              .filter(wk => wk.statusId == 7).length
                          }
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </ContainerBodyScrool>
            </table>
          </ContainerTable>
        </ContainerFilterBody>
      </ContainerResidentialReportBody>
    </ContainerResidentialReport>
  )
}

export default ResidentialReport
