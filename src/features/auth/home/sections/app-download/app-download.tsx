import React from 'react';
import styled from 'styled-components';

const AppDownloadWrapper = styled.section`
  background-color: #fff;
  z-index: 0;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px 64px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 64px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

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
`;

const AppDownloadTitle = styled.h2`
  letter-spacing: -0.64px;
  font: 600 32px Raleway, sans-serif;
`;

const AppDownloadSubheading = styled.p`
  margin-top: 8px;
  font: 400 20px Inter, sans-serif;
`;

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
`;

const QRCodeImage = styled.img`
  aspect-ratio: 1.01;
  object-fit: contain;
  object-position: center;
  width: 212px;
  max-width: 100%;
`;

const AppDownload: React.FC = () => {
  return (
    <AppDownloadWrapper>
      <AppDownloadContent>
        <AppDownloadTitle>Descarga la app</AppDownloadTitle>
        <AppDownloadSubheading>y comienza tu nueva vida.</AppDownloadSubheading>
      </AppDownloadContent>
      <QRCodeContainer>
        <QRCodeImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f489ba0bfb1bc8519ad8e1c928914e30fc82b69df0f06d67f7f0bba70bb0f438?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="QR Code para descargar la app" />
      </QRCodeContainer>
    </AppDownloadWrapper>
  );
};

export default AppDownload;