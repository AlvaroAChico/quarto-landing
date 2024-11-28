import React, { useState, useEffect } from "react"
import {
  CalculatorDetail,
  CalculatorForm,
  ContainerAdds,
  ContainerCalculator,
  ContainerDashboard,
  ContainerImageAdd,
  ContainerItemCalcDetail,
  ContainerTextAdd,
  FormContainer,
  ItemCalcDetail,
  ItemSwiperAdd,
} from "./dashboard.styles"
import StadisticsCard from "./components/stadistics-card"
import useDataUser from "../../utils/use-data-user"
import { useNavigate } from "react-router-dom"
import { UserDTO } from "../../core/models/interfaces/user-model"
import { setErrResponse } from "../../utils/erros-util"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { Swiper } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"
import Button from "../../components/button/button"
import { palette } from "../../config/theme/theme"
import { pathRoutes } from "../../config/routes/paths"
import PropertiesAddsIMG from "../../assets/img/properties-adds.png"
import { selectStyles, WrapperInput } from "../../config/theme/global-styles"
import Select from "react-select"
import StatsICON from "../../assets/img/icons/paid.svg"
import KeyICON from "../../assets/img/icons/key_stats.svg"
import DoorICON from "../../assets/img/icons/door_front_stats.svg"
import HomeICON from "../../assets/img/icons/gite.svg"
import TenantsICON from "../../assets/img/icons/group_add_stats.svg"

const Dashboard: React.FC = () => {
  // Property
  const [optionsProperty, setOptionsProperty] = React.useState<any>([])
  const [seleOpProperty, setSeleOpProperty] = React.useState(null)
  const handleChangeOptionProperty = (value: any) => {
    // setValue("property_id", value.value)
    setSeleOpProperty(value)
  }
  // End Property
  // City
  const [optionsCity, setOptionsCity] = React.useState<any>([])
  const [seleOpCity, setSeleOpCity] = React.useState(null)
  const handleChangeOptionCity = (value: any) => {
    // setValue("city_id", value.value)
    setSeleOpCity(value)
  }
  // EndCity
  // Urbanization
  const [optionsUrbanization, setOptionsUrbanization] = React.useState<any>([])
  const [seleOpUrbanization, setSeleOpUrbanization] = React.useState(null)
  const handleChangeOptionUrbanization = (value: any) => {
    // setValue("urbanization_id", value.value)
    setSeleOpUrbanization(value)
  }
  // End Urbanization
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      // await Promise.all([fetchDataContractors()])
    }

    fetchDataAsync()
  }, [])

  const handleToCreate = () =>
    navigate(pathRoutes.PROPERTY.otherPaths.CREATE.to)

  return (
    <>
      <ContainerDashboard>
        <StadisticsCard
          data={"$3, 000"}
          label="Gananancias este Mes"
          icon={StatsICON}
          bg="#D9F7E7"
        />
        <StadisticsCard
          data={"45"}
          label="Alq. Concretados"
          icon={KeyICON}
          bg="#D9F7E7"
        />
        <StadisticsCard
          data={"23"}
          label="Visitas Realizadas"
          icon={DoorICON}
          bg="#E4E4FF"
        />
        <StadisticsCard
          data={"16"}
          label="Prop. Captadas"
          icon={HomeICON}
          bg="#E4E4FF"
        />
        <StadisticsCard
          data={"25"}
          label="Inquilinos Referidos"
          icon={TenantsICON}
          bg="#FEF2D6"
        />
      </ContainerDashboard>
      <ContainerAdds>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={30}
          modules={[Navigation, Autoplay]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={swiper => console.log(swiper)}
          navigation
          loop
        >
          <ItemSwiperAdd key={1}>
            <ContainerTextAdd>
              <h3>
                ¡Capta y gana <br /> con Quarto!
              </h3>
              <p>
                Una vez que tu propiedad captada se alquile <br /> recibirás el
                50%-40% del primer mes de alquiler
              </p>
              <div>
                <Button
                  onClick={handleToCreate}
                  text="Subir propiedad"
                  isLoading={false}
                  customStyles={`
                  background: ${palette.whiteColor};
                  color: ${palette.blackColor};
                  font-weight: 600;
                  margin-top: 20px;
                  `}
                />
              </div>
            </ContainerTextAdd>
            <ContainerImageAdd>
              <img src={PropertiesAddsIMG} />
            </ContainerImageAdd>
          </ItemSwiperAdd>
          <ItemSwiperAdd key={1}>
            <ContainerTextAdd>
              <h3>
                ¡Capta y gana <br /> con Quarto!
              </h3>
              <p>
                Una vez que tu propiedad captada se alquile <br /> recibirás el
                50%-40% del primer mes de alquiler
              </p>
              <div>
                <Button
                  onClick={handleToCreate}
                  text="Subir propiedad"
                  isLoading={false}
                  customStyles={`
                  background: ${palette.whiteColor};
                  color: ${palette.blackColor};
                  font-weight: 600;
                  margin-top: 20px;
                  `}
                />
              </div>
            </ContainerTextAdd>
            <ContainerImageAdd>
              <img src={PropertiesAddsIMG} />
            </ContainerImageAdd>
          </ItemSwiperAdd>
        </Swiper>
      </ContainerAdds>
      <ContainerCalculator>
        <CalculatorForm>
          <h3>Calculadora de Precios por M2</h3>
          <FormContainer>
            <WrapperInput>
              <label htmlFor="owner-create-project">
                Selecciona un tipo de propiedad
              </label>
              <Select
                id="owner-create-project"
                defaultValue={seleOpProperty}
                onChange={handleChangeOptionProperty}
                options={optionsProperty}
                isSearchable={true}
                styles={selectStyles}
              />
            </WrapperInput>
            <WrapperInput>
              <label htmlFor="owner-create-project">
                Selecciona una Ciudad o Municipio
              </label>
              <Select
                id="owner-create-project"
                defaultValue={seleOpCity}
                onChange={handleChangeOptionCity}
                options={optionsCity}
                isSearchable={true}
                styles={selectStyles}
              />
            </WrapperInput>
            <WrapperInput>
              <label htmlFor="owner-create-project">
                Selecciona una Urbanización
              </label>
              <Select
                id="owner-create-project"
                defaultValue={seleOpUrbanization}
                onChange={handleChangeOptionUrbanization}
                options={optionsUrbanization}
                isSearchable={true}
                styles={selectStyles}
              />
            </WrapperInput>
          </FormContainer>
        </CalculatorForm>
        <CalculatorDetail>
          <h3>Valor</h3>
          <ContainerItemCalcDetail>
            <ItemCalcDetail>
              <span>Tipo de Propiedad</span>
              <span>
                <strong>Casa</strong>
              </span>
            </ItemCalcDetail>
            <ItemCalcDetail>
              <span>Ciudad o Municipio</span>
              <span>
                <strong>Caracas</strong>
              </span>
            </ItemCalcDetail>
            <ItemCalcDetail>
              <span>Urbanización</span>
              <span>
                <strong>Colinas de Bello Monte</strong>
              </span>
            </ItemCalcDetail>
            <ItemCalcDetail>
              <span>
                <strong>Valor por M2</strong>
              </span>
              <span>
                <strong>$9,19</strong>
              </span>
            </ItemCalcDetail>
          </ContainerItemCalcDetail>
        </CalculatorDetail>
      </ContainerCalculator>
    </>
  )
}

export default Dashboard
