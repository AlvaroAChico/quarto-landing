import React from "react"
import {
  ContainerCard,
  ContainerInfo,
  ContainerHeadImage,
} from "./contact-card.styles"
import Button from "../../../../components/button/button"
import { palette } from "../../../../config/theme/theme"
import { ContactDTO } from "../../../../core/models/interfaces/contact-model"
import { Message } from "@styled-icons/typicons/Message"

interface IOwnProps {
  contact: ContactDTO
}

const ContactCard: React.FC<IOwnProps> = ({ contact }) => {
  return (
    <ContainerCard>
      <div>
        <img src={contact.picture} />
      </div>
      <ContainerInfo>
        <p>
          {contact.first_name} {contact.last_name}
        </p>
        <span>{contact.email}</span>
        <div>
          <Button
            onClick={() => console.log}
            text="Mensaje"
            IconLeft={Message}
            customStyles={`
            background: white;
            border: 1px solid ${palette.inputBorderolor};
            color: ${palette.blackColor};
            font-weight: 600;
            `}
          />
        </div>
      </ContainerInfo>
    </ContainerCard>
  )
}

export default ContactCard
