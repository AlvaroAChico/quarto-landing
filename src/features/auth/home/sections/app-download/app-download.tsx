import React from "react"
import styled from "styled-components"
import { breakpoints } from "../../../../../constants/breakpoints"

const AppDownloadWrapper = styled.section`
  background-color: #fff;
  justify-content: center;
  align-items: center;
  padding: 30px 0 60px;
  display: flex;
  width: 100%;
  gap: 40px;

  ${breakpoints.tabletMediumMax} {
    padding: 30px 30px 60px;
    flex-direction: column;
  }
`

const AppDownloadContent = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  color: #000;
  text-align: center;
  line-height: 1.2;
  justify-content: start;
  width: 245px;
  margin: auto 0;

  ${breakpoints.tabletMediumMax} {
    justify-content: center;
    width: 100%;
  }
`

const AppDownloadTitle = styled.h2`
  letter-spacing: -0.64px;
  font:
    600 32px Raleway,
    sans-serif;
`

const AppDownloadSubheading = styled.p`
  margin-top: 8px;
  font:
    400 20px Inter,
    sans-serif;
`

const QRCodeContainer = styled.div`
  border-radius: 20px;
  background-color: #fff;
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  margin: auto 0;
  padding: 0 19px;

  ${breakpoints.tabletMediumMax} {
    display: none;
  }
`

const QRCodeImage = styled.img`
  aspect-ratio: 1.01;
  object-fit: contain;
  object-position: center;
  width: 212px;
  max-width: 100%;
`

const ContainerStoreLinks = styled.div`
  flex-direction: column;
  display: none;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    display: flex;
  }
`

const AppStoreItem = styled.img`
  max-width: 150px;
  width: 100%;
`

const AppDownload: React.FC = () => {
  return (
    <AppDownloadWrapper>
      <AppDownloadContent>
        <AppDownloadTitle>Descarga la app</AppDownloadTitle>
        <AppDownloadSubheading>y comienza tu nueva vida.</AppDownloadSubheading>
      </AppDownloadContent>
      <QRCodeContainer>
        <QRCodeImage
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f489ba0bfb1bc8519ad8e1c928914e30fc82b69df0f06d67f7f0bba70bb0f438?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
          alt="QR Code para descargar la app"
        />
      </QRCodeContainer>
      <ContainerStoreLinks>
        <AppStoreItem
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb221e30fe4988323864db9c15306b95c5c6142278c23095890ef4d2da7d44dc?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
          alt="App Store"
        />
        <AppStoreItem
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3b8c7255bb39a22e21820b494704f6cd36f7f79cadf35cb5a50db22d5e65e6ea?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
          alt="Google Play"
        />
      </ContainerStoreLinks>
    </AppDownloadWrapper>
  )
}

export default AppDownload
