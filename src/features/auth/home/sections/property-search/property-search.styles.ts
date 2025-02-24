import styled from "styled-components"

export const SearchWrapper = styled.section`
  flex-direction: column;
  justify-content: start;
  display: flex;
  width: 100%;
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 40px;
  position: relative;
  min-height: 650px;
  height: fit-content;
  width: 100%;
  align-items: center;
  gap: 32px;
  justify-content: start;
  padding: 21px 80px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`

export const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 40px;
`

export const SearchForm = styled.form`
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
`

export const SearchTitle = styled.h2`
  color: #000;
  letter-spacing: -1.08px;
  font:
    700 36px/43px Raleway,
    sans-serif;
`

export const SearchFields = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
`

export const OperationType = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  white-space: nowrap;
  justify-content: start;
  font:
    14px DM Sans,
    sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`

export const OperationLabel = styled.label`
  color: #000;
  font-weight: 400;
  line-height: 1;
`

export const OperationToggle = styled.div`
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
`

export const OperationButton = styled.div<{ active?: boolean }>`
  border-radius: 40px;
  background-color: ${props => (props.active ? "#032c29" : "transparent")};
  align-self: stretch;
  color: ${props => (props.active ? "white" : "#000")};
  font-weight: ${props => (props.active ? "700" : "500")};
  margin: auto 0;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`

export const PropertyType = styled.div`
  display: flex;
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
  color: #000;
  justify-content: start;
  font:
    400 14px DM Sans,
    sans-serif;
`

export const PropertyTypeLabel = styled.label`
  line-height: 1;
`

export const PropertyTypeFilters = styled.div`
  display: flex;
  margin-top: 14px;
  width: 100%;
  align-items: start;
  gap: 8px;
  letter-spacing: -0.28px;
  justify-content: start;
  flex-wrap: wrap;
`

export const PropertyTypeButton = styled.div<{ active?: boolean }>`
  align-self: stretch;
  border-radius: 900px;
  background-color: ${props =>
    props.active ? "rgba(0, 196, 154, 0.2)" : "#f6f6f6"};
  min-height: 42px;
  gap: 8px;
  font-weight: ${props => (props.active ? "600" : "400")};
  white-space: nowrap;
  padding: 16px 24px;
  border: 1px solid
    ${props => (props.active ? "rgba(0, 196, 154, 0.4)" : "#e1e1e1")};
  cursor: pointer;
  transition: 0.3s;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`

export const PriceRange = styled.div`
  border-radius: 4px;
  position: relative;
  display: flex;
  margin-top: 24px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`

export const PriceRangeLabel = styled.label`
  color: #000;
  z-index: 0;
  font:
    400 14px/1 DM Sans,
    sans-serif;
`

export const RangeSlider = styled.input`
  width: 100%;
  margin-top: 18px;
`

export const PriceDisplay = styled.div`
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
  font:
    400 12px DM Sans,
    sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`

export const LocationFields = styled.div`
  display: flex;
  margin-top: 24px;
  min-height: 72px;
  width: 100%;
  align-items: center;
  gap: 20px;
  white-space: nowrap;
  justify-content: start;
  flex-wrap: wrap;
  font:
    400 14px DM Sans,
    sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`

export const StateField = styled.div`
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
`

export const StateLabel = styled.label`
  color: #000;
  line-height: 1;
`

export const StateSelect = styled.select`
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
`
export const ItemFormSearchItem = styled.div`
  padding: 10px 0;
`

export const MunicipalityField = styled(StateField)``

export const MunicipalityLabel = styled(StateLabel)``

export const MunicipalitySelect = styled(StateSelect)``

export const SearchButton = styled.button`
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
  font:
    700 16px/1 DM Sans,
    sans-serif;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    white-space: initial;
  }
`

export const RangeContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
`

export const RangeInput = styled.input`
  width: 100%;
  position: relative;
  appearance: none;
  background: transparent;
  pointer-events: none;

  &::-webkit-slider-runnable-track {
    background: #ddd;
    height: 5px;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: #032c29;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    pointer-events: all;
  }
`

export const PriceIndicator = styled.div<{ left: number }>`
  position: absolute;
  top: -30px;
  left: ${props => props.left}%;
  transform: translateX(-50%);
  background: #032c29;
  color: #fff;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
`
