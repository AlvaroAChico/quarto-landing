import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate } from "react-router-dom"
import {
  ContainerListProperties,
  ContainerOffer,
  ContentStylesSection,
  MoreResults,
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
  ContainerSearchSection,
  ContainerSelectSections,
  ContainerText,
  ItemFilterStyle,
  selectFilterStyles,
  selectStylesFilterList,
  selectStylesFilterTable,
} from "../../config/theme/global-styles"
import { Filter2 } from "@styled-icons/remix-line/Filter2"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Replay } from "@styled-icons/material/Replay"
import { ArrowIosDownward, Search } from "styled-icons/evaicons-solid"
import { propertyRepository } from "../../api/repositories/property-repository"
import PropertyListJSON from "../../config/mocks/features/properties/property-list.json"
import Input from "../../components/input/input"

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

  // const [listProperties, setListProperties] = React.useState<PropertyDTO[]>([])
  const [listProperties, setListProperties] = React.useState<PropertyDTO[]>(
    PropertyListJSON as unknown as PropertyDTO[],
  )
  const [isLoadingListProperties, setIsLoadingListProperties] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(async () => {
    try {
      setIsLoadingListProperties(true)
      const response: PropertyDTO[] =
        (await propertyRepository.getProperties()) as PropertyDTO[]
      if (!!response) {
        setListProperties(response)
      }
    } finally {
      setIsLoadingListProperties(false)
    }
  }, [])

  const handleToCreate = () =>
    navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)

  return (
    <SectionRoute>
      <HeaderSection title={"Propiedades"} />
      <ContentStylesSection>
        <ContainerFilters>
          <ContainerSearchSection>
            <ItemFilterStyle>
              <Input placeholder="Busar por dirección" icon={Search} />
            </ItemFilterStyle>
          </ContainerSearchSection>
          <ContainerSelectSections>
            <ItemFilterStyle>
              <Select
                defaultValue={selectedOptionId}
                onChange={handleChangeOptionId}
                options={optionsId}
                isSearchable={false}
                styles={selectStylesFilterList}
                placeholder="Modo"
                noOptionsMessage={() => <>Sin resultados</>}
              />
            </ItemFilterStyle>
            <ItemFilterStyle>
              <Select
                defaultValue={selectedOptionId}
                onChange={handleChangeOptionId}
                options={optionsId}
                isSearchable={false}
                styles={selectStylesFilterList}
                placeholder="Tipo de vivienda"
                noOptionsMessage={() => <>Sin resultados</>}
              />
            </ItemFilterStyle>
            <ItemFilterStyle>
              <Select
                defaultValue={selectedOptionId}
                onChange={handleChangeOptionId}
                options={optionsId}
                isSearchable={false}
                styles={selectStylesFilterList}
                placeholder="Precio"
                noOptionsMessage={() => <>Sin resultados</>}
              />
            </ItemFilterStyle>
            <ItemFilterStyle>
              <Select
                defaultValue={selectedOptionId}
                onChange={handleChangeOptionId}
                options={optionsId}
                isSearchable={false}
                styles={selectStylesFilterList}
                placeholder="Nº de habitaciones"
                noOptionsMessage={() => <>Sin resultados</>}
              />
            </ItemFilterStyle>
          </ContainerSelectSections>
        </ContainerFilters>
        <ContainerListProperties>
          {(listProperties || []).map(prop => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </ContainerListProperties>
      </ContentStylesSection>
      <MoreResults>
        <button>Mostrar más propiedades</button>
      </MoreResults>
    </SectionRoute>
  )
}

export default Properties
