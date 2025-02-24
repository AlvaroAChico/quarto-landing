import React from "react"
import PublishIMG from "../../../../../assets/img/image-adds.png"
import {
  CTAButton,
  CTAText,
  PublishContainer,
  PublishContent,
  PublishCTA,
  PublishImage,
  PublishTitle,
  PublishWrapper,
} from "./publish-property.styles"
import { ArrowForward } from "styled-icons/evaicons-solid"

const PublishProperty: React.FC = () => {
  return (
    <PublishWrapper>
      <PublishContainer>
        <PublishImage loading="lazy" src={PublishIMG} />
        <PublishContent>
          <PublishTitle>
            Publicar tu propiedad en Quarto es totalmente gratis.
          </PublishTitle>
          <PublishCTA>
            <CTAText>Comienza ahora</CTAText>
            <CTAButton aria-label="Comenzar a publicar">
              <ArrowForward />
            </CTAButton>
          </PublishCTA>
        </PublishContent>
      </PublishContainer>
    </PublishWrapper>
  )
}

export default PublishProperty
