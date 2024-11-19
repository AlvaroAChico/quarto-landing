import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate } from "react-router-dom"
import {
  ContainerListProperties,
  ContainerOffer,
  ContainerSearch,
  ContentStylesSection,
  SectionRoute,
} from "./contacts.styles"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import axios from "axios"
import { toast } from "sonner"
import useDataUser from "../../utils/use-data-user"
import { settingsApp } from "../../config/environment/settings"
import { pathRoutes } from "../../config/routes/paths"
import ContactCard from "./components/contact-card/contact-card"
import { ContactDTO } from "../../core/models/interfaces/contact-model"

const Contacts: React.FC = () => {
  const [listContacts, setListContacts] = React.useState<any[]>([])
  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  const [listProperties, setListProperties] = React.useState<ContactDTO[]>([])
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
        .get(`${settingsApp.api.base}/contacts`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const dataResponse: ContactDTO[] = response.data as ContactDTO[]
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
        <ContainerSearch>
          <div></div>
        </ContainerSearch>
        <ContainerListProperties>
          {(listProperties || []).map(prop => (
            <ContactCard
              key={prop.id}
              contact={prop}
            />
          ))}
        </ContainerListProperties>
      </ContentStylesSection>
    </SectionRoute>
  )
}

export default Contacts
