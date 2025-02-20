import React from 'react';
import styled from 'styled-components';

const FeatureSectionWrapper = styled.section`
  Continuing from where we left off:

  background-color: #fff;
  z-index: 0;
  display: flex;
  width: 100%;
  align-items: start;
  gap: 20px;
  justify-content: start;
  flex-wrap: wrap;
  padding: 46px 160px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const FeatureColumn = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: center;
  width: 550px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FeatureCard = styled.div<{ backgroundColor: string }>`
  border-radius: 24px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  min-height: 345px;
  width: 100%;
  max-width: 550px;
  flex-direction: column;
  overflow: hidden;
  justify-content: start;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const FeatureContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: DM Sans, sans-serif;
  color: #000;
  justify-content: center;
  padding: 46px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.96px;
`;

const FeatureSubtitle = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.6px;
  margin-top: 10px;
`;

const FeatureImage = styled.img`
  aspect-ratio: 1.33;
  object-fit: contain;
  object-position: center;
  width: 416px;
  min-width: 240px;
  align-self: flex-end;
`;

const DiscoverSection = styled.div`
  border-radius: 24px;
  background-color: #00c49a;
  position: relative;
  display: flex;
  min-width: 240px;
  min-height: 710px;
  flex-direction: column;
  overflow: hidden;
  color: #000;
  letter-spacing: -0.96px;
  justify-content: start;
  flex: 1;
  flex-basis: 0%;
  padding: 46px 46px 550px;
  font: 700 32px/38px DM Sans, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px 100px;
  }
`;

const DiscoverTitle = styled.h2`
  z-index: 1;
`;

const DiscoverImage = styled.img`
  aspect-ratio: 0.78;
  object-fit: contain;
  object-position: center;
  width: 375px;
  border-radius: 24px;
  position: absolute;
  z-index: 0;
  max-width: 100%;
  left: 87px;
  bottom: 0;
  height: 1392px;
`;

const FeatureSection: React.FC = () => {
  return (
    <FeatureSectionWrapper>
      <FeatureColumn>
        <FeatureCard backgroundColor="#fbf5e7">
          <FeatureContent>
            <FeatureTitle>Alquila pagando Mes a Mes</FeatureTitle>
            <FeatureSubtitle>y sin depósitos en garantía.</FeatureSubtitle>
          </FeatureContent>
          <FeatureImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/eef62c63fc41f01d60f1f6d7c23aaab3943a14b31f94c6e91ad23093567547bf?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Alquiler mensual" />
        </FeatureCard>
        <FeatureCard backgroundColor="#032c29">
          <FeatureContent>
            <FeatureTitle>Compra tu propiedad</FeatureTitle>
            <FeatureSubtitle>con solo la inicial y el resto en cómodas cuotas.</FeatureSubtitle>
          </FeatureContent>
        </FeatureCard>
      </FeatureColumn>
      <DiscoverSection>
        <DiscoverTitle>Descubre cientos de inmuebles al alcance de tu mano</DiscoverTitle>
        <DiscoverImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9e26838077601388cc4fdc07bc596b5ce29bd47d73ab464fa7b7c812d8f71f8?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Descubre inmuebles" />
      </DiscoverSection>
    </FeatureSectionWrapper>
  );
};

export default FeatureSection;