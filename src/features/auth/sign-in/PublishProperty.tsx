import React from 'react';
import styled from 'styled-components';

const PublishWrapper = styled.section`
  background-color: #fff;
  z-index: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  color: #010101;
  font-weight: 700;
  justify-content: center;
  padding: 46px 160px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const PublishContainer = styled.div`
  border-radius: 24px;
  display: flex;
  min-height: 430px;
  width: 100%;
  overflow: hidden;
  justify-content: start;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const PublishImage = styled.img`
  aspect-ratio: 1.3;
  object-fit: contain;
  object-position: center;
  width: 100%;
  min-width: 240px;
  flex: 1;
  flex-basis: 92px;
  padding: 46px 0;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const PublishContent = styled.div`
  background-color: #4568df;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  flex-basis: 0%;
  padding: 46px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const PublishTitle = styled.h2`
  background-blend-mode: normal;
  font: 32px Raleway, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const PublishCTA = styled.div`
  display: flex;
  margin-top: 210px;
  width: 100%;
  align-items: center;
  gap: 14px;
  justify-content: flex-end;
  font: 18px DM Sans, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const CTAText = styled.span`
  background-blend-mode: normal;
  align-self: stretch;
  margin: auto 0;
`;

const CTAButton = styled.button`
  border-radius: 900px;
  background-color: #fff;
  align-self: stretch;
  display: flex;
  min-height: 52px;
  gap: 10px;
  width: 52px;
  height: 52px;
  margin: auto 0;
  padding: 14px 0;
  border: none;
  cursor: pointer;
`;

const PublishProperty: React.FC = () => {
  return (
    <PublishWrapper>
      <PublishContainer>
        <PublishImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca444f9a007b706881fa324ea543b2904d43359f99952c0f0ffb8a58f0c7663e?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Publish property" />
        <PublishContent>
          <PublishTitle>
            Publicar tu propiedad en Quarto es totalmente gratis.
          </PublishTitle>
          <PublishCTA>
            <CTAText>Comienza ahora</CTAText>
            <CTAButton aria-label="Comenzar a publicar">
              {/* Add arrow icon here */}
            </CTAButton>
          </PublishCTA>
        </PublishContent>
      </PublishContainer>
    </PublishWrapper>
  );
};

export default PublishProperty;