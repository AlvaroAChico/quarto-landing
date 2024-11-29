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
import { contactRepository } from "../../api/repositories/contact-repository"
import ContactsJSON from "../../config/mocks/features/contacts/contacts-list.json"

const Contacts: React.FC = () => {
  const [listContacts, setListContacts] = React.useState<ContactDTO[]>([])
  const [isLoadingFetch, setIsLoadingFetch] = React.useState<boolean>(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(async () => {
    try {
      setIsLoadingFetch(true)
      const response: ContactDTO[] =
        (await contactRepository.getAll()) as ContactDTO[]
      if (!!response) {
        setListContacts(response)
      }
    } finally {
      setIsLoadingFetch(false)
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
          {(listContacts.length > 0 ? listContacts : ContactsJSON).map(prop => (
            <ContactCard key={prop.id} contact={prop} />
          ))}
        </ContainerListProperties>
      </ContentStylesSection>
    </SectionRoute>
  )
}

export default Contacts
