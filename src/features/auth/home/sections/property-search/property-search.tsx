import {
  BackgroundImage,
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
  StateField,
  StateLabel,
  StateSelect,
} from "./property-search.styles"
import HeroIMG from "../../../../../assets/img/hero-image.png"
import { FC, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../../config/routes/paths"
import Select from "react-select"
import { selectStyles } from "../../../../../config/theme/global-styles"

const PropertySearch: FC = () => {
  // Filter Status
  const [optionsStatus, setOptionsStatus] = useState<any>([])
  const [selectedOptionStatus, setSelectedOptionStatus] = useState<any>(null)
  const handleChangeOptionStatus = (value: any) => {
    setSelectedOptionStatus(value)
  }
  // Filter Municipios
  const [optionsMunicipio, setOptionsMunicipio] = useState<any>([])
  const [selectedOptionMunicipio, setSelectedOptionMunicipio] =
    useState<any>(null)
  const handleChangeOptionMunicipio = (value: any) => {
    setSelectedOptionMunicipio(value)
  }
  // End Selects
  const [opType, setOpType] = useState<number>(1)
  const [propType, setPropType] = useState<number>(1)
  const navigate = useNavigate()

  const handleSearchProperty = () => navigate(pathRoutes.PROPERTY.to)

  // Rango de Precios
  const prices = [100, 250, 500, 750, 1000]
  const [minPrice, setMinPrice] = useState<number>(100)
  const [maxPrice, setMaxPrice] = useState<number>(1000)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [newMin, newMax] = e.target.value.split(",").map(Number)
    if (newMin < newMax) {
      setMinPrice(newMin)
      setMaxPrice(newMax)
    }
  }

  const getPercentage = (value: number) => {
    const min = 100
    const max = 1000
    return ((value - min) / (max - min)) * 100
  }

  return (
    <SearchWrapper>
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
                  onClick={() => setOpType(1)}
                >
                  Alquilar
                </OperationButton>
                <OperationButton
                  active={opType == 2}
                  onClick={() => setOpType(2)}
                >
                  Comprar
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
                  Apartamento
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 3}
                  onClick={() => setPropType(3)}
                >
                  Habitación
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 4}
                  onClick={() => setPropType(4)}
                >
                  Anexo
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 5}
                  onClick={() => setPropType(5)}
                >
                  Casa
                </PropertyTypeButton>
                <PropertyTypeButton
                  active={propType == 6}
                  onClick={() => setPropType(6)}
                >
                  Local Comercial
                </PropertyTypeButton>
              </PropertyTypeFilters>
            </PropertyType>
            {/* <PriceRange>
              <PriceRangeLabel htmlFor="priceRange">
                Rango de precio
              </PriceRangeLabel>
              <RangeSlider
                type="range"
                id="priceRange"
                min="100"
                max="1000"
                step="50"
              />
              <PriceDisplay>$800</PriceDisplay>
            </PriceRange> */}
            <PriceRange>
              <PriceRangeLabel htmlFor="priceRange">
                Rango de precio
              </PriceRangeLabel>
              <RangeContainer>
                <PriceIndicator left={getPercentage(minPrice)}>
                  ${minPrice}
                </PriceIndicator>
                <PriceIndicator left={getPercentage(maxPrice)}>
                  ${maxPrice}
                </PriceIndicator>
                <RangeInput
                  type="range"
                  min="100"
                  max="1000"
                  step="10"
                  value={`${minPrice},${maxPrice}`}
                  onChange={handleChange}
                />
              </RangeContainer>
            </PriceRange>
            <LocationFields>
              <StateField>
                <StateLabel htmlFor="state">Estado</StateLabel>
                {/* <StateSelect id="state">
                  <option value="">Seleccionar</option>
                </StateSelect> */}
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
            </LocationFields>
            <SearchButton onClick={handleSearchProperty}>Buscar</SearchButton>
          </SearchFields>
        </SearchForm>
      </SearchContainer>
    </SearchWrapper>
  )
}

export default PropertySearch
