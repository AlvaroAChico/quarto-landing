import React from "react"
import { ContainerChat, ContainerMessage } from "./chats.styles"
import HeaderSection from "../../components/header-section/header-section"
import BgIMG from "../../assets/img/bg_geometry.svg"
import MessageIMG from "../../assets/img/message_proximamente.svg"

const Chats: React.FC = () => {
  return (
    <ContainerChat>
      <HeaderSection />
      <ContainerMessage bg={BgIMG}>
        <div>
          <img src={MessageIMG} />
          <p>Próximamente</p>
        </div>
      </ContainerMessage>
    </ContainerChat>
  )
}

export default Chats
