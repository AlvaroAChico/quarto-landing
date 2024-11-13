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

const Properties: React.FC = () => {
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
        <ContainerOffer>
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
        </ContainerOffer>
        <ContainerListProperties>
          {(listProperties || []).map(prop => (
            <PropertyCard
              key={prop.id}
              image={prop.image}
              name={prop.name}
              address={prop.address}
              price={prop.price}
            />
          ))}
        </ContainerListProperties>
      </ContentStylesSection>
    </SectionRoute>
  )
}

export default Properties
