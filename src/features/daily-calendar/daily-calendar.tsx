import React from "react"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { InfoCalendarDTO } from "../../core/models/interfaces/calendar-model"
import { setErrResponse } from "../../utils/erros-util"
import { ServiceDTO } from "../../core/models/interfaces/roles-model"
import {
  FilterPermissionsDTO,
  UserDTO,
} from "../../core/models/interfaces/user-model"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import ItemDailyCalendar from "./components/item-daily-calendar/item-daily-calendar"
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline"
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline"
import {
  BodyDailyCalendar,
  ContainerDailyCalendar,
  ContainerDailyStyles,
  DataDailyCalendar,
  FilterDailyCalendar,
  HeaderDailyCalendar,
  ItemDaily,
  ItemFilterDC,
} from "./daily-calendar.styles"
import { compareEqualsDate, formatToDDMMYYYY } from "../../utils/date-util"
import Button from "../../components/button/button"
import ModalAddService from "../../components/modal/variants/modal-add-service/modal-add-service"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"
import Select from "react-select"
import { selectStyles } from "../../config/theme/global-styles"
import { APP_MENU, EOptionsKey } from "../../constants/app"
import ModalEditWork from "../../components/modal/variants/modal-edit-work/modal-edit-work"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  InfoCardDaily,
  InfoTextDaily,
  ItemCalendarStyles,
} from "./components/item-daily-calendar/item-daily-calendar.styles"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/paths"
import ModalDeleteGeneral from "../../components/modal/variants/modal-delete-general/modal-delete-general"

const DailyCalendar: React.FC = () => {
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
    if (
      !!data &&
      !Object.values(APP_MENU).some(permission =>
        data?.calendar.includes(permission),
      )
    ) {
      return
    }
  }, [])

  const [isOpenModalEdit, setIsOpenModalEdit] = React.useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] =
    React.useState<boolean>(false)
  const [dataEdit, setDataEdit] = React.useState<InfoCalendarDTO>()
  const [dataDelete, setDataDelete] = React.useState<InfoCalendarDTO>()
  const [isLoadingDataCalendar, setIsLoadingDataCalendar] =
    React.useState<boolean>(false)
  const [infoCalendar, setInfoCalendar] = React.useState<InfoCalendarDTO[]>([])
  const [allDataCalendar, setAllDataCalendar] = React.useState<
    InfoCalendarDTO[]
  >([])
  // Properties
  const [optionsProperty, setOptionsProperty] = React.useState<any>([])
  const [selectedOptionProperty, setSelectedOptionProperty] =
    React.useState<any>(null)
  // Contractors
  const [optionsContractors, setOptionsContractors] = React.useState<any>([])
  const [selectedOptionContractor, setSelectedOptionContractor] =
    React.useState<any>(null)
  // Services
  const [optionsServices, setOptionsServices] = React.useState<any>([])
  const [selectedOptionService, setSelectedOptionService] =
    React.useState<any>(null)
  const [daySelected, setDaySelected] = React.useState<any>(new Date())

  const [isOpenModalAdd, setIsOpenModalAdd] = React.useState(false)

  const handleCloseModalEdit = () => setIsOpenModalEdit(false)

  const handleOpenModalAdd = () => setIsOpenModalAdd(true)
  const handleCloseModalAdd = () => setIsOpenModalAdd(false)

  const handleChangeOptionProperty = (keyOption: EOptionsKey, value: any) => {
    if (keyOption == EOptionsKey.PROPERTY_KEY) {
      setSelectedOptionProperty(value)
    }
  }

  const handleChangeOptionContractor = (keyOption: EOptionsKey, value: any) => {
    if (keyOption == EOptionsKey.CONTRACTOR_KEY) {
      setSelectedOptionContractor(value)
    }
  }

  const handleChangeOptionService = (keyOption: EOptionsKey, value: any) => {
    if (keyOption == EOptionsKey.SERVICE_KEY) {
      setSelectedOptionService(value)
    }
  }

  const [daysToShow, setDaysToShow] = React.useState(2)

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setDaysToShow(1)
    } else {
      setDaysToShow(2)
    }
  }

  React.useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleDayClick = (day: any) => {
    setDaySelected(day)
  }

  const handleNextDay = () => {
    const nextDay = new Date(daySelected)
    nextDay.setDate(daySelected.getDate() + 1)
    setDaySelected(nextDay)
  }

  const handlePrevDay = () => {
    const prevDay = new Date(daySelected)
    prevDay.setDate(daySelected.getDate() - 1)
    setDaySelected(prevDay)
  }

  const days = []
  for (let i = -daysToShow; i <= daysToShow; i++) {
    const day = new Date(daySelected)
    day.setDate(day.getDate() + i)
    days.push(day)
  }

  const handleError = (err: any) => {
    setErrResponse(err)
  }

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
      handleError(err)
      throw err
    }
  }

  const handleEditWork = React.useCallback(
    (workId: number) => () => {
      setDataEdit(allDataCalendar.filter(work => work.id === workId)[0])
      setIsOpenModalEdit(true)
    },
    [allDataCalendar],
  )

  const handleDeleteWork = React.useCallback(
    (workId: number) => () => {
      setDataDelete(allDataCalendar.filter(work => work.id === workId)[0])
      setIsOpenModalDelete(true)
    },
    [allDataCalendar],
  )

  const getDataCalendar = async () => {
    const data = handleGetPermissions()
    const storedToken = handleGetToken()
    if (!!storedToken) {
      if (
        data?.calendar.includes(APP_MENU.LIST) ||
        data?.calendar.includes(APP_MENU.READ_OWN)
      ) {
        setIsLoadingDataCalendar(true)
        axios
          .get(
            `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status,images`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            },
          )
          .then(response => {
            const listData: InfoCalendarDTO[] =
              response.data as InfoCalendarDTO[]
            setAllDataCalendar(listData)
            setInfoCalendar(listData)
            setIsLoadingDataCalendar(false)
          })
          .catch(err => {
            setErrResponse(err)
            setIsLoadingDataCalendar(false)
          })
      }
    }
  }

  const [listCurrentProperty, setListCurrentProperty] = React.useState<
    PropertyDTO[]
  >([])

  const fetchDataResidentials = async () => {
    try {
      const data: PropertyDTO[] = await fetchData(
        `${settingsApp.api.base}/residentials?include=apartments`,
      )
      const listProperties = (data || []).map(property => ({
        value: property.id,
        label: property.name,
      }))
      setOptionsProperty(listProperties)
      setListCurrentProperty(data)
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
      setOptionsContractors(listUsers)
    } catch (err) {
      setErrResponse(err)
    }
  }

  const fetchDataServices = async () => {
    try {
      const data: ServiceDTO[] = await fetchData(
        `${settingsApp.api.base}/services`,
      )
      const listServices = (data || []).map(servi => ({
        value: servi.id,
        label: servi.name,
      }))
      setOptionsServices(listServices)
    } catch (err) {
      setErrResponse(err)
    }
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([
        fetchDataServices(),
        fetchDataContractors(),
        fetchDataResidentials(),
        getDataCalendar(),
      ])
    }

    fetchDataAsync()
  }, [])

  const filterCalendarData = () => {
    let newListCal = [...allDataCalendar]

    if (selectedOptionProperty) {
      newListCal = newListCal.filter(
        info => info.residential.id === selectedOptionProperty.value,
      )
    }

    if (selectedOptionContractor) {
      newListCal = newListCal.filter(
        info =>
          info.contractor &&
          info.contractor.id === selectedOptionContractor.value,
      )
    }

    if (selectedOptionService) {
      newListCal = newListCal.filter(
        info =>
          info.service && info.service.name === selectedOptionService.label,
      )
    }
    setInfoCalendar(newListCal)
  }

  React.useEffect(() => {
    filterCalendarData()
  }, [
    selectedOptionProperty,
    selectedOptionContractor,
    selectedOptionService,
    daySelected,
  ])

  return (
    <>
      <ContainerDailyCalendar>
        <FilterDailyCalendar>
          <ItemFilterDC>
            {dataPermissions?.work.includes(APP_MENU.CREATE) && (
              <Button text="New work" onClick={handleOpenModalAdd} />
            )}
          </ItemFilterDC>
          <ItemFilterDC>
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
              popperModifiers={[
                {
                  name: "myModifier",
                  fn(state) {
                    return state
                  },
                },
              ]}
            />
          </ItemFilterDC>
          <ItemFilterDC>
            <Select
              id="property-create-apartment"
              defaultValue={selectedOptionProperty}
              onChange={(value: any) =>
                handleChangeOptionProperty(EOptionsKey.PROPERTY_KEY, value)
              }
              options={optionsProperty}
              isSearchable={true}
              styles={selectStyles}
              placeholder="Properties"
            />
          </ItemFilterDC>
          <ItemFilterDC>
            <Select
              id="contractor-create-apartment"
              defaultValue={selectedOptionContractor}
              onChange={(value: any) =>
                handleChangeOptionContractor(EOptionsKey.CONTRACTOR_KEY, value)
              }
              options={optionsContractors}
              isSearchable={true}
              styles={selectStyles}
              placeholder="Contractor"
            />
          </ItemFilterDC>
          <ItemFilterDC>
            <Select
              id="service-create-apartment"
              defaultValue={selectedOptionService}
              onChange={(value: any) =>
                handleChangeOptionService(EOptionsKey.SERVICE_KEY, value)
              }
              options={optionsServices}
              isSearchable={true}
              styles={selectStyles}
              placeholder="Services"
            />
          </ItemFilterDC>
          <ItemFilterDC>
            {dataPermissions?.work.includes(APP_MENU.CREATE) && (
              <Button text="New work" onClick={handleOpenModalAdd} />
            )}
          </ItemFilterDC>
        </FilterDailyCalendar>
        <DataDailyCalendar>
          <HeaderDailyCalendar>
            <ContainerDailyStyles>
              <div>
                <span>
                  <ArrowIosBackOutline onClick={handlePrevDay} />
                </span>
              </div>
              {days.map((day, index) => (
                <ItemDaily
                  $isActiveDay={
                    daySelected.toDateString() === day.toDateString()
                  }
                  key={index}
                  onClick={() => handleDayClick(day)}
                >
                  <span>
                    {day
                      .toLocaleDateString("en-US", { weekday: "long" })
                      .substring(0, 3)}
                  </span>
                  <span>{day.getDate()}</span>
                </ItemDaily>
              ))}
              <div>
                <span>
                  <ArrowIosForwardOutline onClick={handleNextDay} />
                </span>
              </div>
            </ContainerDailyStyles>
          </HeaderDailyCalendar>
          <BodyDailyCalendar>
            {!isLoadingDataCalendar &&
              (infoCalendar || []).map(info => {
                if (
                  compareEqualsDate(
                    formatToDDMMYYYY(info.startDate),
                    daySelected.toLocaleDateString("es-ES"),
                  )
                ) {
                  return (
                    <ItemDailyCalendar
                      key={info.id}
                      info={info}
                      dataPermissions={
                        dataPermissions ?? ({} as FilterPermissionsDTO)
                      }
                      onEditItem={handleEditWork(info.id)}
                      onDeleteWork={handleDeleteWork(info.id)}
                      onRefreshData={getDataCalendar}
                    />
                  )
                }
              })}
            {isLoadingDataCalendar && (
              <>
                <Skeleton count={5} height={60} />
              </>
            )}
          </BodyDailyCalendar>
        </DataDailyCalendar>
      </ContainerDailyCalendar>
      <ModalEditWork
        isOpen={isOpenModalEdit}
        handleClose={handleCloseModalEdit}
        handleRefreshData={getDataCalendar}
        dataEdit={dataEdit!!}
        listServices={optionsServices}
        listContractors={optionsContractors}
        listResidentials={optionsProperty}
        listProperties={listCurrentProperty}
      />
      <ModalAddService
        isOpen={isOpenModalAdd}
        handleClose={handleCloseModalAdd}
        handleRefreshData={getDataCalendar}
        listServices={optionsServices}
        listContractors={optionsContractors}
        listResidentials={optionsProperty}
        listProperties={listCurrentProperty}
      />
      <ModalDeleteGeneral
        isOpen={isOpenModalDelete}
        dataAPI="works"
        dataLabel="work"
        dataId={dataDelete?.id || ""}
        dataName={`${dataDelete?.id}` || ""}
        handleClose={() => setIsOpenModalDelete(false)}
        handleRefresh={getDataCalendar}
      />
    </>
  )
}

export default DailyCalendar
