import {
  BackgroundImage,
  DoubleSliderContainer,
  HeadImageMobile,
  ItemFormSearchItem,
  LocationFields,
  MunicipalityField,
  MunicipalityLabel,
  MunicipalitySelect,
  OperationButton,
  OperationLabel,
  OperationToggle,
  OperationType,
  PriceDisplay,
  PriceIndicator,
  PriceRange,
  PriceRangeLabel,
  PropertyType,
  PropertyTypeButton,
  PropertyTypeFilters,
  PropertyTypeLabel,
  RangeContainer,
  RangeInput,
  RangeSlider,
  SearchButton,
  SearchContainer,
  SearchFields,
  SearchForm,
  SearchTitle,
  SearchWrapper,
  SliderTrack,
  StateField,
  StateLabel,
  StateSelect,
  UrbanizationField,
  UrbanizationLabel,
} from "./property-search.styles"
import HeroIMG from "../../../../../assets/img/hero-image.png"
import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../../config/routes/paths"
import Select from "react-select"
import { selectStyles } from "../../../../../config/theme/global-styles"
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react"
import ApartmentIconIMG from "../../../../../assets/img/icons/icon_apartment_search.png"
import DoorIconIMG from "../../../../../assets/img/icons/icon_door_search.png"
import MultiroomIconIMG from "../../../../../assets/img/icons/icon_multiroom_search.png"
import HomeIconIMG from "../../../../../assets/img/icons/icon_home_search.png"
import ComercialIconIMG from "../../../../../assets/img/icons/icon_comercial_search.png"
import { useDispatch } from "react-redux"
import { ETypeModeSearch } from "../../../../../constants/app"
import { updateModeSearch } from "../../../../../core/store/app-store/appSlice"
import { useCities } from "../../../../../apis/hooks/use-cities"
import { useMunicipalities } from "../../../../../apis/hooks/use-municipalities"
import { useUrbanizations } from "../../../../../apis/hooks/use-urbanizations"
import {
  CityDTO,
  MunicipalityDTO,
  UrbanizationDTO,
} from "../../../../../core/models/interfaces/city-model"

const PropertySearch: FC = () => {
  const dispatch = useDispatch()
  // Filter Status
  const [optionsStatus, setOptionsStatus] = useState<any>([])
  const [selectedOptionStatus, setSelectedOptionStatus] = useState<any>(null)
  const handleChangeOptionStatus = (value: any) => {
    setSelectedOptionStatus(value)
  }
  // City
  const [optionsCity, setOptionsCity] = useState<any>()
  const [seleOpCity, setSeleOpCity] = useState<{
    value: string
    label: string
  } | null>(null)
  const handleChangeOptionCity = (value: any) => {
    setSeleOpCity(value)
    setOptionsMunicipality(
      (allMunicipality || [])
        .filter(ft => ft.cityId == value.value)
        .map(it => ({
          value: it.id,
          label: it.name,
        })),
    )
  }
  // Municipality
  const [allMunicipality, setAllMunicipality] = useState<MunicipalityDTO[]>()
  const [optionsMunicipality, setOptionsMunicipality] = useState<any>()
  const [seleOpMunicipality, setSeleOpMunicipality] = useState<{
    value: string
    label: string
  } | null>(null)
  const handleChangeOptionMunicipality = (value: any) => {
    setSeleOpMunicipality(value)
    setOptionsUrbanization(
      (allUrbanization || [])
        .filter(ft => ft.municipalityId == value.value)
        .map(it => ({
          value: it.id,
          label: it.name,
        })),
    )
  }
  // Urbanization
  const [allUrbanization, setAllUrbanization] = useState<UrbanizationDTO[]>()
  const [optionsUrbanization, setOptionsUrbanization] = useState<any>()
  const [seleOpUrbanization, setSeleOpUrbanization] = useState<{
    value: string
    label: string
  } | null>(null)
  const handleChangeOptionUrbanization = (value: any) => {
    setSeleOpUrbanization(value)
  }

  // End Selects
  const [opType, setOpType] = useState<number>(1)
  const [propType, setPropType] = useState<number>(-1)
  const navigate = useNavigate()

  const handleSearchProperty = () =>
    navigate(
      `${pathRoutes.PROPERTY.to}?type_id=${opType}&category_id=${propType != -1 ? propType : ""}&price_min=${minPrice}&price_max=${maxPrice}&city_id=${seleOpCity?.value ?? ""}&municipality_id=${seleOpMunicipality?.value ?? ""}&urbanization_id=${seleOpUrbanization?.value ?? ""}`,
    )

  const [minPrice, setMinPrice] = useState<number>(opType == 1 ? 100 : 50000)
  const [maxPrice, setMaxPrice] = useState<number>(opType == 1 ? 1000 : 500000)

  const handleChangeOpType = (dataOp: number) => () => {
    dispatch(
      updateModeSearch(
        dataOp == 1 ? ETypeModeSearch.ALQUILAR : ETypeModeSearch.VENTA,
      ),
    )
    setOpType(dataOp)
  }

  const { data: dataCities, isLoading: isLoadingCities } = useCities()
  const { data: dataMuni, isLoading: isLoadingMuni } = useMunicipalities()
  const { data: dataUrba, isLoading: isLoadingUrba } = useUrbanizations()

  useEffect(() => {
    if (dataCities && !isLoadingCities) {
      const cityOptions = dataCities.map((city: CityDTO) => ({
        value: city.id,
        label: city.name,
      }))
      setOptionsCity(cityOptions)
    }
  }, [dataCities, isLoadingCities])

  useEffect(() => {
    if (dataMuni && !isLoadingMuni) {
      setAllMunicipality(dataMuni)
    }
  }, [dataMuni, isLoadingMuni])

  useEffect(() => {
    if (dataUrba && !isLoadingUrba) {
      setAllUrbanization(dataUrba)
    }
  }, [dataUrba, isLoadingUrba])

  return (
    <SearchWrapper>
      <HeadImageMobile>
        <img src={HeroIMG} />
      </HeadImageMobile>
      <SearchContainer>
        <BackgroundImage loading="lazy" src={HeroIMG} alt="Background" />
        <SearchForm>
          <SearchTitle>
            Encuentra tu <br />
            propiedad ideal
          </SearchTitle>
          <SearchFields>
            <OperationType>
              <OperationLabel htmlFor="operation">Operación</OperationLabel>
              <OperationToggle>
                <OperationButton
                  active={opType == 1}
                  onClick={handleChangeOpType(1)}
                >
                  Alquiler
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
                  active={propType == -1}
                  onClick={() => setPropType(-1)}
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
                  label={false}
                  ruler={false}
                ></MultiRangeSlider>
              </RangeContainer>
            </PriceRange>
            <LocationFields>
              <StateField>
                <StateLabel htmlFor="state">Ciudad</StateLabel>
                <ItemFormSearchItem>
                  <Select
                    id="city-create-project"
                    defaultValue={seleOpCity}
                    onChange={handleChangeOptionCity}
                    options={optionsCity}
                    isSearchable={true}
                    styles={selectStyles}
                  />
                </ItemFormSearchItem>
              </StateField>
              <MunicipalityField>
                <MunicipalityLabel htmlFor="municipality">
                  Municipio
                </MunicipalityLabel>
                <ItemFormSearchItem>
                  <Select
                    id="municipality-create-project"
                    defaultValue={seleOpMunicipality}
                    onChange={handleChangeOptionMunicipality}
                    options={optionsMunicipality}
                    isSearchable={true}
                    styles={selectStyles}
                  />
                </ItemFormSearchItem>
              </MunicipalityField>
            </LocationFields>
            <UrbanizationField>
              <UrbanizationLabel htmlFor="urbanization">
                Urbanización
              </UrbanizationLabel>
              <ItemFormSearchItem>
                <Select
                  id="urbanization-create-project"
                  defaultValue={seleOpUrbanization}
                  onChange={handleChangeOptionUrbanization}
                  options={optionsUrbanization}
                  isSearchable={true}
                  styles={selectStyles}
                />
              </ItemFormSearchItem>
            </UrbanizationField>
            <SearchButton onClick={handleSearchProperty}>Buscar</SearchButton>
          </SearchFields>
        </SearchForm>
      </SearchContainer>
    </SearchWrapper>
  )
}

export default PropertySearch
