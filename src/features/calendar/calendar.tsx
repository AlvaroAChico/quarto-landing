import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import {
  ContainerCalendar,
  ContainerDaysStyles,
  ContainerFilter,
  ContainerListData,
  ItemDay,
  ItemFilterCalendar,
} from "./calendar.styles"
import { ArrowIosBackOutline } from "@styled-icons/evaicons-outline/ArrowIosBackOutline"
import { ArrowIosForwardOutline } from "@styled-icons/evaicons-outline/ArrowIosForwardOutline"
import useDataUser from "../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { InfoCalendarDTO } from "../../core/models/interfaces/calendar-model"
import { toast } from "sonner"
import { compareEqualsDate, formatToDDMMYYYY } from "../../utils/date-util"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { selectStyles, WrapperInput } from "../../config/theme/global-styles"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"
import Select from "react-select"
import { EOptionsKey } from "../../constants/app"
import Input from "../../components/input/input"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import { UserDTO } from "../../core/models/interfaces/user-model"
import { ServiceDTO } from "../../core/models/interfaces/services-model"
import ModalAddService from "../../components/modal/variants/modal-add-service/modal-add-service"
import Button from "../../components/button/button"
import ItemCalendarInfo from "./functionalities/item-calendar-info"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import { setErrResponse } from "../../utils/erros-util"

const Calendar: React.FC = () => {
  const [isLoadingFilterCalendar, setIsLoadingFilterCalendar] =
    React.useState<boolean>(false)
  const [infoCalendar, setInfoCalendar] = React.useState<InfoCalendarDTO[]>([])
  const [allDataCalendar, setAllDataCalendar] = React.useState<
    InfoCalendarDTO[]
  >([])
  const [daySelected, setDaySelected] = React.useState<any>(new Date())
  // Selected Property
  const [selectedOptionProperty, setSelectedOptionProperty] =
    React.useState<any>(null)
  const [selectedOptionContractor, setSelectedOptionContractor] =
    React.useState<any>(null)
  const [selectedOptionService, setSelectedOptionService] =
    React.useState<any>(null)
  const [optionsProperty, setOptionsProperty] = React.useState<any>([])
  const [optionsContractors, setOptionsContractors] = React.useState<any>([])
  const [optionsServices, setOptionsServices] = React.useState<any>([])

  const [isOpenModalAdd, setIsOpenModalAdd] = React.useState(false)

  const handleOpenModalAdd = () => setIsOpenModalAdd(true)
  const handleCloseModalAdd = () => setIsOpenModalAdd(false)
  const handleAddServiceModal = () => setIsOpenModalAdd(false)

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
  for (let i = -2; i <= 2; i++) {
    const day = new Date(daySelected)
    day.setDate(day.getDate() + i)
    days.push(day)
  }

  const { handleGetToken } = useDataUser()

  const fetchListFilterCalendar = () => {
    setIsLoadingFilterCalendar(true)
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/works?include=apartment,residential,contractor,service,status`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const listData: InfoCalendarDTO[] = response.data as InfoCalendarDTO[]
          setInfoCalendar(listData)
          setAllDataCalendar(listData)
          setIsLoadingFilterCalendar(false)
        })
        .catch(err => {
          setErrResponse(err)
          setIsLoadingFilterCalendar(false)
        })
    }
  }

  const fetchDateComboBox = React.useCallback(() => {
    // Fetch Properties
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/residentials`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: PropertyDTO[] = response.data as PropertyDTO[]
          // setListProperties(listData)
          const listProperties = (listData || []).map(data => ({
            value: data.id,
            label: data.name,
          }))
          setOptionsProperty(listProperties.filter(propertu => !!propertu))
        })
        .catch(err => {
          if (verifyErrResponse(err)) {
            toast.error(err.response.data.message)
          } else {
            toast.error("Failed to fetch data")
          }
        })
    }
    // Fetch Contractors
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/users?include=role`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: UserDTO[] = response.data as UserDTO[]
          // setListContractors(listData)
          const listUsers = (listData || []).map(user => {
            if (user.role[0].name.toLowerCase() == "contractor".toLowerCase()) {
              return {
                value: user.id,
                label: `${user.firstName} ${user.lastName}`,
              }
            }
          })
          setOptionsContractors(listUsers.filter(user => !!user))
        })
        .catch(err => {
          if (verifyErrResponse(err)) {
            toast.error(err.response.data.message)
          } else {
            toast.error("Failed to fetch data")
          }
        })
    }
    // Fetch Services
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/services`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const listData: ServiceDTO[] = response.data as ServiceDTO[]
          // setListServices(listData)
          const listServ = (listData || []).map(servi => ({
            value: servi.id,
            label: servi.name,
          }))
          setOptionsServices(listServ.filter(servi => !!servi))
        })
        .catch(err => {
          if (verifyErrResponse(err)) {
            toast.error(err.response.data.message)
          } else {
            toast.error("Failed to fetch data")
          }
        })
    }
  }, [handleGetToken])

  const verifyErrResponse = (err: any): boolean =>
    !!err &&
    !!err.response &&
    !!err.response.data &&
    !!err.response.data.message

  React.useEffect(() => {
    fetchDateComboBox()
    fetchListFilterCalendar()
  }, [])

  const refreshDataCalendar = React.useCallback(() => {
    const currentData = allDataCalendar.map(item => ({ ...item }))
    let newListCal: InfoCalendarDTO[] = []

    if (!!selectedOptionProperty) {
      newListCal = [
        ...currentData.filter(
          info => info.residential.id == selectedOptionProperty?.value,
        ),
      ]
    }

    if (!!selectedOptionContractor) {
      newListCal = newListCal
        .filter(data => !!data.contractor && !!data.contractor.id)
        .filter(info => info.contractor.id == selectedOptionContractor?.value)
    }

    if (!!selectedOptionService) {
      newListCal = newListCal.filter(
        info => info.service.name == selectedOptionService?.label,
      )
    }

    if (
      !!selectedOptionProperty ||
      !!selectedOptionContractor ||
      !!selectedOptionService
    ) {
      setInfoCalendar(newListCal)
    }
  }, [
    daySelected,
    selectedOptionProperty,
    selectedOptionContractor,
    selectedOptionService,
    allDataCalendar,
    infoCalendar,
  ])

  React.useEffect(() => {
    refreshDataCalendar()
  }, [selectedOptionProperty, selectedOptionContractor, selectedOptionService])

  const handleChangeOptionProperty = (keyOption: EOptionsKey, value: any) => {
    if (keyOption == EOptionsKey.PROPERTY_KEY) {
      setSelectedOptionProperty(value)
    }
  }

  const handleChangeOptionContractor = (keyOption: EOptionsKey, value: any) => {
    if (keyOption == EOptionsKey.PROPERTY_KEY) {
      setSelectedOptionContractor(value)
    }
  }

  const handleChangeOptionService = (keyOption: EOptionsKey, value: any) => {
    if (keyOption == EOptionsKey.PROPERTY_KEY) {
      setSelectedOptionService(value)
    }
  }

  return (
    <div>
      <HeaderSection title="Calendar" subtitle="Calendar" />
      <ContainerCalendar>
        <ContainerFilter>
          <ItemFilterCalendar>
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
          </ItemFilterCalendar>
          <ItemFilterCalendar>
            <Select
              id="contractor-create-apartment"
              defaultValue={selectedOptionProperty}
              onChange={(value: any) =>
                handleChangeOptionProperty(EOptionsKey.PROPERTY_KEY, value)
              }
              options={optionsProperty}
              isSearchable={true}
              styles={selectStyles}
              placeholder="Properties"
            />
          </ItemFilterCalendar>
          <ItemFilterCalendar>
            <Select
              id="contractor-create-apartment"
              defaultValue={selectedOptionContractor}
              onChange={(value: any) =>
                handleChangeOptionContractor(EOptionsKey.PROPERTY_KEY, value)
              }
              options={optionsContractors}
              isSearchable={true}
              styles={selectStyles}
              placeholder="Contractor"
            />
          </ItemFilterCalendar>
          <ItemFilterCalendar>
            <Select
              id="contractor-create-apartment"
              defaultValue={selectedOptionService}
              onChange={(value: any) =>
                handleChangeOptionService(EOptionsKey.PROPERTY_KEY, value)
              }
              options={optionsServices}
              isSearchable={true}
              styles={selectStyles}
              placeholder="Services"
            />
          </ItemFilterCalendar>
          <ItemFilterCalendar>
            <Button text="New work" onClick={handleOpenModalAdd} />
          </ItemFilterCalendar>
        </ContainerFilter>
        <ContainerDaysStyles>
          <div>
            <span>
              <ArrowIosBackOutline onClick={handlePrevDay} />
            </span>
          </div>
          {days.map((day, index) => (
            <ItemDay
              isActiveDay={daySelected.toDateString() === day.toDateString()}
              key={index}
              onClick={() => handleDayClick(day)}
            >
              <span>
                {day
                  .toLocaleDateString("en-US", { weekday: "long" })
                  .substring(0, 3)}
              </span>
              <span>{day.getDate()}</span>
            </ItemDay>
          ))}
          <div>
            <span>
              <ArrowIosForwardOutline onClick={handleNextDay} />
            </span>
          </div>
        </ContainerDaysStyles>
        <ContainerListData>
          {(infoCalendar || []).map(info => {
            if (
              compareEqualsDate(
                formatToDDMMYYYY(info.startDate),
                daySelected.toLocaleDateString(),
              )
            ) {
              return <ItemCalendarInfo info={info} />
            }
          })}
          {isLoadingFilterCalendar && (
            <>
              <Skeleton count={5} height={80} />
            </>
          )}
        </ContainerListData>
      </ContainerCalendar>
      <ModalAddService
        isOpen={isOpenModalAdd}
        handleClose={handleCloseModalAdd}
        handleRefreshData={fetchListFilterCalendar}
      />
    </div>
  )
}

export default Calendar
