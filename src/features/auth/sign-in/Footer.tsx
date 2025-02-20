import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #fff;
  border-color: #e1e1e1;
  border-top-width: 1px;
  border-top-style: solid;
  z-index: 0;
  display: flex;
  min-height: 380px;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  padding: 64px 160px 24px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const FooterContent = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  gap: 24px;
  justify-content: start;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FooterColumn = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  flex-grow: 1;
  width: 210px;
`;

const SocialMediaLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: start;
`;

const SocialMediaIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
  align-self: stretch;
  margin: auto 0;
`;

const WhatsAppButton = styled.button`
  border-radius: 9999px;
  background-color: #00c49a;
  display: flex;
  margin-top: 48px;
  align-items: center;
  gap: 8px;
  overflow: hidden;
  color: #000;
  white-space: nowrap;
  justify-content: center;
  padding: 16px 24px;
  font: 400 16px/1 Inter, sans-serif;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
    padding: 0 20px;
  }
`;

const FooterLinkList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkTitle = styled.h3`
  display: flex;
  width: 100%;
  padding-bottom: 12px;
  flex-direction: column;
  font-size: 16px;
  font-weight: 700;
  justify-content: start;
`;

const FooterLink = styled.li`
  margin-top: 12px;
  font: 400 14px/1.4 DM Sans, sans-serif;
`;

const AppStoreLinks = styled.div`
  display: flex;
  margin-top: 12px;
  width: 138px;
  max-width: 100%;
  flex-direction: column;
  justify-content: start;
`;

const AppStoreImage = styled.img`
  aspect-ratio: 3.29;
  object-fit: contain;
  object-position: center;
  width: 100%;
  margin-top: 8px;
`;

const Copyright = styled.div`
  align-self: center;
  margin-top: 57px;
  gap: 24px;
  color: #000;
  font: 400 12px/1.4 DM Sans, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterColumn>
          <SocialMediaLinks>
            <SocialMediaIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d94090b47ab407848a0b267666b0d9fc9be5f93793e331d50a89514117c2b278?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Facebook" />
            <SocialMediaIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e57a552bfaa9d8cef21c7a873354093f7a105c538e81a29b9154e4c2b3173c3?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Instagram" />
            <SocialMediaIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7bf33901ac062ccc9f89ff15a4caa291951d2d842ad7313799ddcd90c5ada73?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Twitter" />
            <SocialMediaIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/04320c6611ccdde4a709e47521ff72e8ad0add22a85ff1574273e174facbf077?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="LinkedIn" />
          </SocialMediaLinks>
          <WhatsAppButton>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d6aa960ec3438290256ecc8ef638801c86c2cb02f6a966491c50c9591f7133b?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="WhatsApp icon" />
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
            <AppStoreImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb221e30fe4988323864db9c15306b95c5c6142278c23095890ef4d2da7d44dc?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="App Store" />
            <AppStoreImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b8c7255bb39a22e21820b494704f6cd36f7f79cadf35cb5a50db22d5e65e6ea?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Google Play" />
          </AppStoreLinks>
        </FooterColumn>
      </FooterContent>
      <Copyright>
        Copyright © 2024, Quarto. RIF J-504967866, Quarto Latam C.A. Todos los derechos reservados.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;