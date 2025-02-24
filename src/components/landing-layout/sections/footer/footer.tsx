import { FC } from "react"
import {
  AppStoreImage,
  AppStoreLinks,
  Copyright,
  FooterColumn,
  FooterContent,
  FooterLink,
  FooterLinkList,
  FooterLinkTitle,
  FooterWrapper,
  LogoWrapper,
  SocialMediaIcon,
  SocialMediaLinks,
  WhatsAppButton,
} from "./footer.styles"
import LogoIMG from "../../../../assets/img/logo.png"

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <LogoWrapper>
            <img src={LogoIMG} alt="Logo Quarto" />
          </LogoWrapper>
          <SocialMediaLinks>
            <SocialMediaIcon
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d94090b47ab407848a0b267666b0d9fc9be5f93793e331d50a89514117c2b278?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="Facebook"
            />
            <SocialMediaIcon
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e57a552bfaa9d8cef21c7a873354093f7a105c538e81a29b9154e4c2b3173c3?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="Instagram"
            />
            <SocialMediaIcon
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7bf33901ac062ccc9f89ff15a4caa291951d2d842ad7313799ddcd90c5ada73?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="Twitter"
            />
            <SocialMediaIcon
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/04320c6611ccdde4a709e47521ff72e8ad0add22a85ff1574273e174facbf077?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="LinkedIn"
            />
          </SocialMediaLinks>
          <WhatsAppButton>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d6aa960ec3438290256ecc8ef638801c86c2cb02f6a966491c50c9591f7133b?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="WhatsApp icon"
            />
            Whatsapp
          </WhatsAppButton>
        </FooterColumn>
        <FooterColumn>
          <FooterLinkTitle>Inquilinos y compradores</FooterLinkTitle>
          <FooterLinkList>
            <FooterLink>Propiedades en Alquiler</FooterLink>
            <FooterLink>Propiedades en Venta</FooterLink>
          </FooterLinkList>
        </FooterColumn>
        <FooterColumn>
          <FooterLinkTitle>Propietarios</FooterLinkTitle>
          <FooterLinkList>
            <FooterLink>Alquilar tu propiedad</FooterLink>
            <FooterLink>Vender tu propiedad</FooterLink>
            <FooterLink>Calculadora m²</FooterLink>
          </FooterLinkList>
        </FooterColumn>
        <FooterColumn>
          <FooterLinkTitle>Descarga la app</FooterLinkTitle>
          <AppStoreLinks>
            <AppStoreImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb221e30fe4988323864db9c15306b95c5c6142278c23095890ef4d2da7d44dc?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="App Store"
            />
            <AppStoreImage
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b8c7255bb39a22e21820b494704f6cd36f7f79cadf35cb5a50db22d5e65e6ea?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
              alt="Google Play"
            />
          </AppStoreLinks>
        </FooterColumn>
      </FooterContent>
      <Copyright>
        Copyright © 2024, Quarto. RIF J-504967866, Quarto Latam C.A. Todos los
        derechos reservados.
      </Copyright>
    </FooterWrapper>
  )
}

export default Footer
