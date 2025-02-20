import React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.section`
  z-index: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  padding: 0 80px 46px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 32px;
  position: relative;
  min-height: 679px;
  width: 100%;
  align-items: center;
  gap: 32px;
  justify-content: start;
  padding: 21px 80px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const SearchForm = styled.form`
  position: relative;
  border-radius: 16px;
  background-color: #fff;
  align-self: stretch;
  display: flex;
  min-width: 320px;
  width: 480px;
  flex-direction: column;
  justify-content: start;
  margin: auto 0;
  padding: 24px 32px;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const SearchTitle = styled.h2`
  color: #000;
  letter-spacing: -1.08px;
  font: 700 36px/43px Raleway, sans-serif;
`;

const SearchFields = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
`;

const OperationType = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  white-space: nowrap;
  justify-content: start;
  font: 14px DM Sans, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const OperationLabel = styled.label`
  color: #000;
  font-weight: 400;
  line-height: 1;
`;

const OperationToggle = styled.div`
  border-radius: 40px;
  background-color: #f6f6f6;
  align-self: start;
  display: flex;
  margin-top: 11px;
  align-items: center;
  gap: 4px;
  line-height: 1;
  justify-content: start;
  padding: 4px;
  border: 1px solid #e1e1e1;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const OperationButton = styled.button<{ active?: boolean }>`
  border-radius: 40px;
  background-color: ${props => props.active ? '#032c29' : 'transparent'};
  align-self: stretch;
  color: ${props => props.active ? '#010101' : '#000'};
  font-weight: ${props => props.active ? '700' : '500'};
  margin: auto 0;
  padding: 12px 24px;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const PropertyType = styled.div`
  display: flex;
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
  color: #000;
  justify-content: start;
  font: 400 14px DM Sans, sans-serif;
`;

const PropertyTypeLabel = styled.label`
  line-height: 1;
`;

const PropertyTypeFilters = styled.div`
  display: flex;
  margin-top: 14px;
  width: 100%;
  align-items: start;
  gap: 8px;
  letter-spacing: -0.28px;
  justify-content: start;
  flex-wrap: wrap;
`;

const PropertyTypeButton = styled.button<{ active?: boolean }>`
  align-self: stretch;
  border-radius: 900px;
  background-color: ${props => props.active ? 'rgba(0, 196, 154, 0.2)' : '#f6f6f6'};
  min-height: 42px;
  gap: 8px;
  font-weight: ${props => props.active ? '700' : '400'};
  white-space: nowrap;
  padding: 16px 24px;
  border: 1px solid ${props => props.active ? 'rgba(0, 196, 154, 0.4)' : '#e1e1e1'};
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`;

const PriceRange = styled.div`
  border-radius: 4px;
  position: relative;
  display: flex;
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

const PriceRangeLabel = styled.label`
  color: #000;
  z-index: 0;
  font: 400 14px/1 DM Sans, sans-serif;
`;

const RangeSlider = styled.input`
  width: 100%;
  margin-top: 18px;
`;

const PriceDisplay = styled.div`
  border-radius: 8px 8px 8px 0;
  background-color: #032c29;
  align-self: start;
  position: absolute;
  color: #010101;
  white-space: nowrap;
  text-align: center;
  right: 50px;
  top: -8px;
  padding: 4px 8px;
  font: 400 12px DM Sans, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const LocationFields = styled.div`
  display: flex;
  margin-top: 24px;
  min-height: 72px;
  width: 100%;
  align-items: center;
  gap: 20px;
  white-space: nowrap;
  justify-content: start;
  flex-wrap: wrap;
  font: 400 14px DM Sans, sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StateField = styled.div`
  border-radius: 4px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 198px;
  margin: auto 0;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const StateLabel = styled.label`
  color: #000;
  line-height: 1;
`;

const StateSelect = styled.select`
  border-radius: 8px;
  display: flex;
  margin-top: 14px;
  min-height: 48px;
  width: 100%;
  flex-direction: column;
  color: #010101;
  justify-content: center;
  padding: 14px 16px;
  border: 1px solid #acacac;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const MunicipalityField = styled(StateField)``;

const MunicipalityLabel = styled(StateLabel)``;

const MunicipalitySelect = styled(StateSelect)``;

const SearchButton = styled.button`
  align-self: stretch;
  border-radius: 9999px;
  background-color: #00c49a;
  margin-top: 24px;
  min-height: 52px;
  width: 100%;
  gap: 8px;
  overflow: hidden;
  color: #000;
  white-space: nowrap;
  padding: 18px 8px;
  font: 700 16px/1 DM Sans, sans-serif;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const PropertySearch: React.FC = () => {
  return (
    <SearchWrapper>
      <SearchContainer>
        <BackgroundImage loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/071281669e945820509e71a6e34fe0b034e9d5b7b35994e291d42d18241a7deb?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2" alt="Background" />
        <SearchForm>
          <SearchTitle>
            Encuentra tu <br />
            propiedad ideal
          </SearchTitle>
          <SearchFields>
            <OperationType>
              <OperationLabel htmlFor="operation">Operación</OperationLabel>
              <OperationToggle>
                <OperationButton active>Alquilar</OperationButton>
                <OperationButton>Comprar</OperationButton>
              </OperationToggle>
            </OperationType>
            <PropertyType>
              <PropertyTypeLabel htmlFor="propertyType">Tipo de propiedad</PropertyTypeLabel>
              <PropertyTypeFilters>
                <PropertyTypeButton active>Todas</PropertyTypeButton>
                <PropertyTypeButton>Apartamento</PropertyTypeButton>
                <PropertyTypeButton>Habitación</PropertyTypeButton>
                <PropertyTypeButton>Anexo</PropertyTypeButton>
                <PropertyTypeButton>Casa</PropertyTypeButton>
                <PropertyTypeButton>Local Comercial</PropertyTypeButton>
              </PropertyTypeFilters>
            </PropertyType>
            <PriceRange>
              <PriceRangeLabel htmlFor="priceRange">Rango de precio</PriceRangeLabel>
              <RangeSlider type="range" id="priceRange" min="100" max="1000" step="50" />
              <PriceDisplay>$800</PriceDisplay>
            </PriceRange>
            <LocationFields>
              <StateField>
                <StateLabel htmlFor="state">Estado</StateLabel>
                <StateSelect id="state">
                  <option value="">Seleccionar</option>
                </StateSelect>
              </StateField>
              <MunicipalityField>
                <MunicipalityLabel htmlFor="municipality">Municipio</MunicipalityLabel>
                <MunicipalitySelect id="municipality">
                  <option value="">Seleccionar</option>
                </MunicipalitySelect>
              </MunicipalityField>
            </LocationFields>
            <SearchButton type="submit">Buscar</SearchButton>
          </SearchFields>
        </SearchForm>
      </SearchContainer>
    </SearchWrapper>
  );
};

export default PropertySearch;