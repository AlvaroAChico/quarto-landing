import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate } from "react-router-dom"
import {
  ContainerListProperties,
  ContainerOffer,
  ContentStylesSection,
  SectionRoute,
} from "./properties.styles"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import axios from "axios"
import { toast } from "sonner"
import useDataUser from "../../utils/use-data-user"
import { settingsApp } from "../../config/environment/settings"
import Button from "../../components/button/button"
import { palette } from "../../config/theme/theme"
import PropertyCard from "./components/property-card/property-card"
import { pathRoutes } from "../../config/routes/paths"
import {
  ContainerFilters,
  ContainerReset,
  ContainerResetMobileFilter,
  ContainerText,
  ItemFilterStyle,
  selectFilterStyles,
  selectStylesFilterTable,
} from "../../config/theme/global-styles"
import { Filter2 } from "@styled-icons/remix-line/Filter2"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Replay } from "@styled-icons/material/Replay"
import { ArrowIosDownward } from "styled-icons/evaicons-solid"

const Properties: React.FC = () => {
  const [listRentals, setListRentals] = React.useState<any[]>([])
  // Filter ID
  const [optionsId, setOptionsId] = React.useState<any>([])
  const [selectedOptionId, setSelectedOptionId] = React.useState<any>(null)
  const handleChangeOptionId = (value: any) => {
    setSelectedOptionId(value)
    const listIds = listRentals.filter(prop => prop.id == value.value)
  }
  // Filter Category
  const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  const [selectedOptionCategory, setSelectedOptionCategory] =
    React.useState<any>(null)
  const handleChangeOptionCategory = (value: any) => {
    setSelectedOptionCategory(value)
    const listIds = listRentals.filter(prop => prop.id == value.value)
  }
  // Filter Status
  const [optionsStatus, setOptionsStatus] = React.useState<any>([])
  const [selectedOptionStatus, setSelectedOptionStatus] =
    React.useState<any>(null)
  const handleChangeOptionStatus = (value: any) => {
    setSelectedOptionStatus(value)
    const listIds = listRentals.filter(prop => prop.id == value.value)
  }
  const [daySelected, setDaySelected] = React.useState<any>(null)
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  const [listProperties, setListProperties] = React.useState<PropertyDTO[]>([])
  const [isLoadingListProperties, setIsLoadingListProperties] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(() => {
    const storedToken = handleGetToken()
    if (storedToken) {
      setIsLoadingListProperties(true)
      axios
        .get(`${settingsApp.api.base}/properties`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const dataResponse: PropertyDTO[] = response.data as PropertyDTO[]
          if (!!dataResponse) {
            setListProperties(dataResponse)
          }
          setIsLoadingListProperties(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingListProperties(false)
        })
    }
  }, [])

  const handleToCreate = () =>
    navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)

  return (
    <SectionRoute>
      <HeaderSection />
      <ContentStylesSection>
        <ContainerResetMobileFilter>
          <ContainerText>
            <span>
              <Filter2 />
            </span>
            <span>Filtrar por</span>
          </ContainerText>
          <ContainerReset>
            <span>
              <Replay />
            </span>
            <span>Reiniciar filtro</span>
          </ContainerReset>
        </ContainerResetMobileFilter>
        <ContainerFilters>
          <ItemFilterStyle>
            <ContainerText>
              <span>
                <Filter2 />
              </span>
              <span>Filtrar por</span>
            </ContainerText>
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectStylesFilterTable}
              placeholder="ID"
              noOptionsMessage={() => <>Sin resultados</>}
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            {/* <input placeHolder */}
            <DatePicker
              id="date-create-apartment"
              showIcon
              selected={daySelected}
              icon={<></>}
              toggleCalendarOnIconClick
              onChange={(date: any) => {
                setDaySelected(date)
                // setValue("date", date)
              }}
              placeholderText="Fecha"
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
            <span>
              <ArrowIosDownward />
            </span>
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectStylesFilterTable}
              placeholder="Categoría"
              noOptionsMessage={() => <>Sin resultados</>}
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectStylesFilterTable}
              placeholder="Estado"
              noOptionsMessage={() => <>Sin resultados</>}
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            <ContainerReset>
              <span>
                <Replay />
              </span>
              <span>Reiniciar filtro</span>
            </ContainerReset>
          </ItemFilterStyle>
        </ContainerFilters>
        <ContainerListProperties>
          {(listProperties || []).map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </ContainerListProperties>
      </ContentStylesSection>
    </SectionRoute>
  )
}

export default Properties
