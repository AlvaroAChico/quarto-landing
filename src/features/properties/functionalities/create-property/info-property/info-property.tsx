import { FC, useEffect, useState } from "react"
import {
  CreatePropStep02Form,
  CreatePropStep02Schema,
} from "../../../../../core/models/schemas/property-schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  ContainerButtonCenter,
  ContainerInputsSteps,
  ContainerInputsTwoStep,
} from "../create-property.styles"
import {
  ErrorMessage,
  selectStyles,
  WrapperInput,
} from "../../../../../config/theme/global-styles"
import Select from "react-select"
import Button from "../../../../../components/button/button"
import {
  CityDTO,
  MunicipalityDTO,
  StateDTO,
  UrbanizationDTO,
} from "../../../../../core/models/interfaces/city-model"
import { parameterRepository } from "../../../../../api/repositories/parameter-repository"
import { CategoryDTO } from "../../../../../core/models/interfaces/category-model"
import { categoryRepository } from "../../../../../api/repositories/category-repository"
import { useCities } from "../../../../../apis/hooks/use-cities"
import { useUrbanizations } from "../../../../../apis/hooks/use-urbanizations"
import { useMunicipalities } from "../../../../../apis/hooks/use-municipalities"
import { useCategories } from "../../../../../apis/hooks/use-categories"

interface IOwnProps {
  handleSubmit: (data: CreatePropStep02Form) => void
}

const InfoProperty: FC<IOwnProps> = ({ handleSubmit }) => {
  // Uso del inmueble
  const [optionsUsoInmueble, setOptionsUsoInmueble] = useState<any>([
    { value: "1", label: "Vivienda" },
    { value: "2", label: "Comercial" },
  ])
  const [seleOpUsoInmueble, setSeleOpUsoInmueble] = useState({
    value: "1",
    label: "Vivienda",
  })
  const handleChangeOptionUsoInmueble = (value: any) => {
    setValue("category_id", value.value)
    setSeleOpUsoInmueble(value)
  }
  // City
  const [optionsCity, setOptionsCity] = useState<any>()
  const [seleOpCity, setSeleOpCity] = useState(null)
  const handleChangeOptionCity = (value: any) => {
    setValue("city_id", value.value)
    setValue("city", value.value)
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
  const [seleOpMunicipality, setSeleOpMunicipality] = useState(null)
  const handleChangeOptionMunicipality = (value: any) => {
    setValue("municipality", value.value)
    setValue("municipality_id", value.value)
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
  const [seleOpUrbanization, setSeleOpUrbanization] = useState(null)
  const handleChangeOptionUrbanization = (value: any) => {
    setValue("urbanization", value.value)
    setValue("urbanization_id", value.value)
    setSeleOpUrbanization(value)
  }

  // Category
  const [optionsCategory, setOptionsCategory] = useState<any>()
  const [seleOpCategory, setSeleOpCategory] = useState(null)
  const handleChangeOptionCategory = (value: any) => {
    setValue("category_id", value.value)
    setSeleOpCategory(value)
  }

  const methods = useForm<CreatePropStep02Form>({
    resolver: yupResolver(CreatePropStep02Schema),
    defaultValues: {
      category_id: "",
      city_id: "",
      municipality: "",
      municipality_id: "",
      urbanization: "",
      urbanization_id: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors: errors },
    register: register,
    setValue: setValue,
    getValues: getValues,
    reset: reset,
  } = methods

  const { data: dataCities, isLoading: isLoadingCities } = useCities()
  const { data: dataMuni, isLoading: isLoadingMuni } = useMunicipalities()
  const { data: dataUrba, isLoading: isLoadingUrba } = useUrbanizations()
  const { data: dataCate, isLoading: isLoadingCate } = useCategories()

  useEffect(() => {
    if (dataCities && !isLoadingCities) {
      const cityOptions = dataCities.map((city: CityDTO) => ({
        value: city.id,
        label: city.name,
      }))
      setOptionsCity(cityOptions)

      // if (Array.isArray(optionsCity) && optionsCity.length > 0) {
      //   setValue("city_id", optionsCity[0].value)
      //   setValue("city", optionsCity[0].value)
      //   console.log("OptionCity[0] => ", optionsCity[0])
      //   setSeleOpCity(optionsCity[0])
      // }
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

  useEffect(() => {
    if (dataCate && !isLoadingCate) {
      const categoryOptions = dataCate.map((category: CategoryDTO) => ({
        value: category.id,
        label: category.name,
      }))
      setOptionsCategory(categoryOptions)
    }
  }, [dataCate, isLoadingCate])

  return (
    <ContainerInputsSteps>
      <h3>Datos del inmueble</h3>
      <ContainerInputsTwoStep>
        <WrapperInput>
          <label htmlFor="usoInmueble-create-project">Uso del inmueble</label>
          <Select
            id="usoInmueble-create-project"
            defaultValue={seleOpUsoInmueble}
            onChange={handleChangeOptionUsoInmueble}
            options={optionsUsoInmueble}
            isSearchable={true}
            styles={selectStyles}
          />
          {!!(errors.category_id as any)?.message && (
            <ErrorMessage>{(errors.category_id as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="propertyType-create-project">Tipo de propiedad</label>
          <Select
            id="propertyType-create-project"
            defaultValue={seleOpCategory}
            onChange={handleChangeOptionCategory}
            options={optionsCategory}
            isSearchable={true}
            styles={selectStyles}
          />
          {!!(errors.category_id as any)?.message && (
            <ErrorMessage>{(errors.category_id as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="city-create-project">Ciudad</label>
          <Select
            id="city-create-project"
            defaultValue={seleOpCity}
            onChange={handleChangeOptionCity}
            options={optionsCity}
            isSearchable={true}
            styles={selectStyles}
          />
          {!!(errors.city_id as any)?.message && (
            <ErrorMessage>{(errors.city_id as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="municipality-create-project">Municipio</label>
          <Select
            id="municipality-create-project"
            defaultValue={seleOpMunicipality}
            onChange={handleChangeOptionMunicipality}
            options={optionsMunicipality}
            isSearchable={true}
            styles={selectStyles}
          />
          {!!(errors.municipality as any)?.message && (
            <ErrorMessage>{(errors.municipality as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
        <WrapperInput>
          <label htmlFor="urbanization-create-project">Urbanización</label>
          <Select
            id="urbanization-create-project"
            defaultValue={seleOpUrbanization}
            onChange={handleChangeOptionUrbanization}
            options={optionsUrbanization}
            isSearchable={true}
            styles={selectStyles}
          />
          {!!(errors.urbanization as any)?.message && (
            <ErrorMessage>{(errors.urbanization as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>
      </ContainerInputsTwoStep>
      <ContainerButtonCenter>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text={"Siguiente"}
          disabled={
            !getValues("category_id") ||
            !getValues("city_id") ||
            !getValues("municipality") ||
            !getValues("urbanization") ||
            Object.keys(errors).length > 0
          }
        />
      </ContainerButtonCenter>
    </ContainerInputsSteps>
  )
}

export default InfoProperty
