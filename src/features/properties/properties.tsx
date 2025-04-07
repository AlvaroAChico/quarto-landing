import React, { FC, useEffect, useState } from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate, useSearchParams } from "react-router-dom"
import {
  ContainerListProperties,
  ContainerOffer,
  ContainerProperties,
  ContentStylesSection,
  FiltersDrawer,
  MoreFilterDrawer,
  MoreFilterItem,
  MoreResults,
  ResetFiltersButton,
  SearchButtonsOption,
  SearchWithFiltersButton,
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
  selectStyles,
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
import PropertyCardSkeleton from "./components/property-card/property-card.skeleton"
import FilterIconIMG from "../../assets/img/icons/icon_filter_properties.png"
import { useAppSelector } from "../../app/hooks"
import {
  getModeSearch,
  updateModeSearch,
} from "../../core/store/app-store/appSlice"
import { ETypeModeSearch } from "../../constants/app"
import {
  AcceptMascotasField,
  AcceptMascotasLabel,
  ContainerAcceptMascotas,
  ContainerNroHabitaciones,
  ItemFormSearchItem,
  LocationFields,
  LocationFieldsDrawer,
  MunicipalityField,
  MunicipalityLabel,
  NumeroHabitacionesField,
  NumeroHabitacionesLabel,
  OperationButton,
  OperationLabel,
  OperationToggle,
  OperationType,
  PriceRange,
  PriceRangeLabel,
  PropertyType,
  PropertyTypeButton,
  PropertyTypeFilters,
  PropertyTypeLabel,
  RangeContainer,
  SearchFields,
  SearchFieldsDrawer,
  StateField,
  StateLabel,
  UrbanizationField,
  UrbanizationLabel,
} from "../auth/home/sections/property-search/property-search.styles"
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react"
import { useDispatch } from "react-redux"
import ApartmentIconIMG from "../../assets/img/icons/icon_apartment_search.png"
import DoorIconIMG from "../../assets/img/icons/icon_door_search.png"
import MultiroomIconIMG from "../../assets/img/icons/icon_multiroom_search.png"
import HomeIconIMG from "../../assets/img/icons/icon_home_search.png"
import ComercialIconIMG from "../../assets/img/icons/icon_comercial_search.png"
import TemporalNotBuy from "./temporal-not-buy/temporal-not-buy"
import { usePropertiesMutation } from "../../apis/hooks/use-properties"

const Properties: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isActiveFilters, setIsActiveFilters] = useState<boolean>(false)
  const [listRentals, setListRentals] = useState<any[]>([])
  const opTypeSearch = useAppSelector(getModeSearch)
  // Filter ID
  const [optionsId, setOptionsId] = useState<any>([])
  const [selectedOptionId, setSelectedOptionId] = useState<any>(null)
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
  const dispatch = useDispatch()
  // Filter Municipios
  const [optionsMunicipio, setOptionsMunicipio] = useState<any>([])
  const [selectedOptionMunicipio, setSelectedOptionMunicipio] =
    useState<any>(null)
  const handleChangeOptionMunicipio = (value: any) => {
    setSelectedOptionMunicipio(value)
  }
  // End Selects

  const [filters, setFilters] = useState<Filters>({
    type_id: searchParams.get("type_id") || "",
    category_id: searchParams.get("category_id") || "",
    price_min: searchParams.get("price_min") || "",
    price_max: searchParams.get("price_max") || "",
    city_id: searchParams.get("city_id") || "",
    municipality_id: searchParams.get("municipality_id") || "",
    urbanization_id: searchParams.get("urbanization_id") || "",
  })

  const [opType, setOpType] = useState<number>(1)
  const [propType, setPropType] = useState<number>(1)

  const handleSearchProperty = () => navigate(pathRoutes.PROPERTY.to)

  const [minPrice, setMinPrice] = useState<number>(100)
  const [maxPrice, setMaxPrice] = useState<number>(1000)

  const handleChangeOpType = (dataOp: number) => () => {
    dispatch(
      updateModeSearch(
        dataOp == 1 ? ETypeModeSearch.ALQUILAR : ETypeModeSearch.VENTA,
      ),
    )
    setOpType(dataOp)
  }

  // const [listProperties, setListProperties] = React.useState<PropertyDTO[]>([])
  const [listProperties, setListProperties] = React.useState<PropertyDTO[]>(
    PropertyListJSON as unknown as PropertyDTO[],
  )
  const [isLoadingListProperties, setIsLoadingListProperties] =
    React.useState<boolean>(false)

  const { mutate: getPropertiesAsync, data, error } = usePropertiesMutation()

  interface Filters {
    type_id?: string
    category_id?: string
    price_min?: string
    price_max?: string
    city_id?: string
    municipality_id?: string
    urbanization_id?: string
  }

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(async () => {
    try {
      setIsLoadingListProperties(true)
      await getPropertiesAsync(
        {
          page: 1,
          size: 20,
          filter: {
            // Enviar solo los filtros que tengan valor
            ...Object.keys(filters).reduce(
              (acc, key) => {
                if (filters[key as keyof Filters]) {
                  const value = filters[key as keyof Filters]
                  if (value !== undefined) {
                    acc[key] = value
                  }
                }
                return acc
              },
              {} as Record<string, string>,
            ),
          },
        },
        {
          onSuccess: (response: PropertyDTO[]) => {
            setListProperties(response)
          },
        },
      )
    } finally {
      setIsLoadingListProperties(false)
    }
  }, [filters])

  // Al montar o cuando cambie la URL, actualizamos los filtros
  useEffect(() => {
    setFilters({
      type_id: searchParams.get("type_id") || "",
      category_id: searchParams.get("category_id") || "",
      price_min: searchParams.get("price_min") || "",
      price_max: searchParams.get("price_max") || "",
      city_id: searchParams.get("city_id") || "",
      municipality_id: searchParams.get("municipality_id") || "",
      urbanization_id: searchParams.get("urbanization_id") || "",
    })
    // Al actualizar los filtros desde la URL, hacemos el fetch
    fetchDataProperties()
  }, [searchParams])

  // Cuando el usuario cambia un filtro (por ejemplo, en un select)
  const handleFilterChange = (field: keyof Filters, value: string) => {
    // Actualizamos el estado local
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)

    // Actualizamos la URL
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (value) {
      newSearchParams.set(field, value)
    } else {
      newSearchParams.delete(field)
    }
    setSearchParams(newSearchParams)

    // Opcionalmente, puedes llamar a fetchDataProperties aquí directamente
    // fetchDataProperties();
  }

  const handleToCreate = () =>
    navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)

  if (opTypeSearch == ETypeModeSearch.VENTA) {
    return <TemporalNotBuy />
  }

  return (
    <ContainerProperties>
      <SectionRoute>
        <HeaderSection
          title={`${opTypeSearch == ETypeModeSearch.ALQUILAR ? "Alquiler" : "Venta"} de inmuebles`}
        />
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
                  placeholder="Alquiler"
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
              <ItemFilterStyle>
                <MoreFilterItem onClick={() => setIsActiveFilters(true)}>
                  Más filtros <img src={FilterIconIMG} />
                </MoreFilterItem>
              </ItemFilterStyle>
            </ContainerSelectSections>
          </ContainerFilters>
          <ContainerListProperties>
            {isLoadingListProperties &&
              [...Array(15)].map(prop => <PropertyCardSkeleton />)}
            {!isLoadingListProperties &&
              (listProperties || []).map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
          </ContainerListProperties>
        </ContentStylesSection>
        {/* <MoreResults>
          <button>Mostrar más propiedades</button>
        </MoreResults> */}
      </SectionRoute>
      <MoreFilterDrawer isActiveFilters={isActiveFilters}>
        <FiltersDrawer>
          <SearchFieldsDrawer>
            <span onClick={() => setIsActiveFilters(false)}>x</span>
            <OperationType>
              <OperationLabel htmlFor="operation">Operación</OperationLabel>
              <OperationToggle>
                <OperationButton
                  active={opType == 1}
                  onClick={handleChangeOpType(1)}
                >
                  Alquilar
                </OperationButton>
                <OperationButton
                  active={opType == 2}
                  onClick={handleChangeOpType(2)}
                >
                  Venta
                </OperationButton>
              </OperationToggle>
            </OperationType>
            <PropertyType>
              <PropertyTypeLabel htmlFor="propertyType">
                Tipo de propiedad
              </PropertyTypeLabel>
              <PropertyTypeFilters>
                <PropertyTypeButton
                  active={propType == 1}
                  onClick={() => setPropType(1)}
                >
                  Todas
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 2}
                  onClick={() => setPropType(2)}
                >
                  <img src={ApartmentIconIMG} />
                  Apartamento
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 3}
                  onClick={() => setPropType(3)}
                >
                  <img src={DoorIconIMG} />
                  Habitación
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 4}
                  onClick={() => setPropType(4)}
                >
                  <img src={MultiroomIconIMG} />
                  Anexo
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 5}
                  onClick={() => setPropType(5)}
                >
                  <img src={HomeIconIMG} />
                  Casa
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 6}
                  onClick={() => setPropType(6)}
                >
                  <img src={ComercialIconIMG} />
                  Local Comercial
                </PropertyTypeButton>
              </PropertyTypeFilters>
            </PropertyType>
            <PriceRange>
              <PriceRangeLabel htmlFor="priceRange">
                Rango de precio
              </PriceRangeLabel>
              <RangeContainer rangeNumber={maxPrice} opType={opType}>
                <MultiRangeSlider
                  min={opType == 1 ? 100 : 50000}
                  max={opType == 1 ? 1000 : 500000}
                  step={opType == 1 ? 200 : 20000}
                  minValue={minPrice}
                  maxValue={maxPrice}
                  onInput={(e: ChangeResult) => {
                    setMinPrice(e.minValue)
                    setMaxPrice(e.maxValue)
                  }}
                  // label={false}
                  ruler={false}
                ></MultiRangeSlider>
              </RangeContainer>
            </PriceRange>
            <LocationFieldsDrawer>
              <StateField>
                <StateLabel htmlFor="state">Ciudad</StateLabel>
                <ItemFormSearchItem>
                  <Select
                    defaultValue={selectedOptionStatus}
                    onChange={handleChangeOptionStatus}
                    options={optionsStatus}
                    isSearchable={false}
                    styles={selectStyles}
                    placeholder="Seleccionar"
                    noOptionsMessage={() => <>Sin resultados</>}
                  />
                </ItemFormSearchItem>
              </StateField>
              <MunicipalityField>
                <MunicipalityLabel htmlFor="municipality">
                  Municipio
                </MunicipalityLabel>
                {/* <MunicipalitySelect id="municipality">
                  <option value="">Seleccionar</option>
                </MunicipalitySelect> */}
                <ItemFormSearchItem>
                  <Select
                    defaultValue={selectedOptionMunicipio}
                    onChange={handleChangeOptionMunicipio}
                    options={optionsMunicipio}
                    isSearchable={false}
                    styles={selectStyles}
                    placeholder="Seleccionar"
                    noOptionsMessage={() => <>Sin resultados</>}
                  />
                </ItemFormSearchItem>
              </MunicipalityField>
            </LocationFieldsDrawer>
            <UrbanizationField>
              <UrbanizationLabel htmlFor="urbanization">
                Urbanización
              </UrbanizationLabel>
              {/* <UrbanizationSelect id="urbanization">
                  <option value="">Seleccionar</option>
                </UrbanizationSelect> */}
              <ItemFormSearchItem>
                <Select
                  defaultValue={selectedOptionMunicipio}
                  onChange={handleChangeOptionMunicipio}
                  options={optionsMunicipio}
                  isSearchable={false}
                  styles={selectStyles}
                  placeholder="Seleccionar"
                  noOptionsMessage={() => <>Sin resultados</>}
                />
              </ItemFormSearchItem>
            </UrbanizationField>
            <NumeroHabitacionesField>
              <NumeroHabitacionesLabel htmlFor="numberHabitaciones">
                Número de habitaciones
              </NumeroHabitacionesLabel>
              <ContainerNroHabitaciones>
                <span>1+</span>
                <span>2+</span>
                <span>3+</span>
                <span>4+</span>
              </ContainerNroHabitaciones>
            </NumeroHabitacionesField>
            <AcceptMascotasField>
              <AcceptMascotasLabel htmlFor="acceptMascotas">
                Acepta mascotas
              </AcceptMascotasLabel>
              <ContainerAcceptMascotas>
                <span>Cualquiera</span>
                <span>Si</span>
                <span>No</span>
              </ContainerAcceptMascotas>
            </AcceptMascotasField>
          </SearchFieldsDrawer>
          <SearchButtonsOption>
            <ResetFiltersButton>Reiniciar filtros</ResetFiltersButton>
            <SearchWithFiltersButton>Buscar</SearchWithFiltersButton>
          </SearchButtonsOption>
        </FiltersDrawer>
      </MoreFilterDrawer>
    </ContainerProperties>
  )
}

export default Properties
