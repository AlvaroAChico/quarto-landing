import styled from "styled-components"
import { palette } from "../../../../../config/theme/theme"
import { breakpoints } from "../../../../../constants/breakpoints"

export const SearchWrapper = styled.section`
  flex-direction: column;
  justify-content: start;
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 900px;
  padding: 30px;

  ${breakpoints.tabletLargeMax} {
    height: fit-content;
    max-height: none;
    padding: 0;
  }
`

export const SearchContainer = styled.div`
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  border-radius: 40px;
  position: relative;
  max-height: 900px;
  // overflow: hidden;
  padding: 30px;
  display: flex;
  height: 100%;
  width: 100%;

  ${breakpoints.tabletLargeMax} {
    height: fit-content;
    max-height: none;
    padding: 0;
  }
`

export const HeadImageMobile = styled.div`
  object-position: center;
  object-fit: cover;
  display: none;

  > img {
    width: 100%;
  }

  ${breakpoints.tabletLargeMax} {
    display: flex;
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

  ${breakpoints.tabletLargeMax} {
    display: none;
  }
`

export const SearchForm = styled.form`
  grid-template-rows: fit-content(100%) 1fr;
  background-color: #fff;
  border-radius: 16px;
  position: relative;
  max-height: 840px;
  max-width: 480px;
  padding: 30px;
  height: 100%;
  width: 100%;
  display: grid;

  ${breakpoints.tabletLargeMax} {
    height: fit-content;
    max-height: none;
    max-width: 100vw;
    width: 100%;
  }
`

export const SearchTitle = styled.h2`
  letter-spacing: -1.08px;
  color: #000;
  font:
    700 32px Raleway,
    sans-serif;
`

export const SearchFields = styled.div`
  grid-template-rows: repeat(5, fit-content(100%));
  display: flex;
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  display: grid;
  height: 100%;
  gap: 20px;
  height: 100%;
  max-height: calc(100vh - 150px);
  padding: 10px 0;

  > span:nth-child(1) {
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }
`

export const SearchFieldsDrawer = styled(SearchFields)`
  width: 100%;
  max-width: 420px;
  display: flex;
  // flex-wrap: wrap;
  overflow-y: auto;
  padding: 20px;
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
  height: 45px;

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
  padding: 0 20px;
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  height: 100%;
  font-size: 0.7rem;

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`

export const PropertyType = styled.div`
  display: flex;
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
  font-weight: ${props => (props.active ? "600" : "400")};
  white-space: nowrap;
  padding: 12px 24px;
  border: 1px solid
    ${props => (props.active ? "rgba(0, 196, 154, 0.4)" : "#e1e1e1")};
  cursor: pointer;
  transition: 0.3s;
  font-size: 0.7rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  > img {
    width: 100%;
    max-width: 20px;
  }

  @media (max-width: 991px) {
    white-space: initial;
    padding: 0 20px;
  }
`

export const PriceRange = styled.div`
  border-radius: 4px;
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
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
  width: 100%;
  align-items: center;
  gap: 20px;
  white-space: nowrap;
  justify-content: start;
  // flex-wrap: wrap;
  font:
    400 14px DM Sans,
    sans-serif;

  @media (max-width: 991px) {
    white-space: initial;
  }
`

export const LocationFieldsDrawer = styled(LocationFields)`
  // flex-wrap: wrap;
`

export const NumeroHabitacionesField = styled(LocationFields)`
  align-items: flex-start;
  flex-direction: column;
  gap: 10px;
`

export const AcceptMascotasField = styled(LocationFields)`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
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

  ${breakpoints.tabletLargeMax} {
    width: 100%;
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

export const UrbanizationField = styled(StateField)`
  width: 100%;
`

export const UrbanizationLabel = styled(StateLabel)``

export const NumeroHabitacionesLabel = styled(UrbanizationLabel)``

export const AcceptMascotasLabel = styled(UrbanizationLabel)``

export const ContainerNroHabitaciones = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 5px;

  > span {
    align-self: stretch;
    border-radius: 900px;
    min-height: 42px;
    white-space: nowrap;
    padding: 12px 24px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 0.7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    background-color: #f6f6f6;
    font-weight: 400;
    border: 1px solid #e1e1e1;

    > img {
      width: 100%;
      max-width: 20px;
    }

    &:nth-child(2) {
      background-color: rgba(0, 196, 154, 0.2);
      border: 1px solid rgba(0, 196, 154, 0.4);
      font-weight: 400;
    }

    @media (max-width: 991px) {
      white-space: initial;
      padding: 0 20px;
    }
  }
`

export const ContainerAcceptMascotas = styled.div`
  flex-wrap: wrap;
  display: flex;
  gap: 5px;

  > span {
    align-self: stretch;
    border-radius: 900px;
    min-height: 42px;
    white-space: nowrap;
    padding: 12px 24px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 0.7rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    background-color: #f6f6f6;
    font-weight: 400;
    border: 1px solid #e1e1e1;

    > img {
      width: 100%;
      max-width: 20px;
    }

    &:nth-child(2) {
      background-color: rgba(0, 196, 154, 0.2);
      border: 1px solid rgba(0, 196, 154, 0.4);
      font-weight: 400;
    }

    @media (max-width: 991px) {
      white-space: initial;
      padding: 0 20px;
    }
  }
`

export const SearchButton = styled.button`
  align-self: stretch;
  border-radius: 9999px;
  background-color: #00c49a;
  min-height: 52px;
  width: 100%;
  gap: 8px;
  overflow: hidden;
  color: #000;
  white-space: nowrap;
  padding: 18px 8px;
  font:
    600 16px/1 DM Sans,
    sans-serif;
  border: none;
  cursor: pointer;
`

export const RangeContainer = styled.div<{
  rangeNumber: number
  opType: number
}>`
  position: relative;
  width: 100%;
  margin-top: 10px;

  .multi-range-slider {
    border: none;
    box-shadow: none;
  }

  .bar-right,
  .bar-left {
    box-shadow: none;
    background-color: #dedede;
  }

  .bar-inner {
    background: #032c29;
    box-shadow: none;
  }

  .thumb.thumb-left:before,
  .thumb.thumb-right:before {
    background: #032c29;
    box-shadow: none;
    border: none;
  }

  .caption {
    display: flex !important;
  }

  .min-caption,
  .max-caption {
    background: #032c29 !important;
    box-shadow: none !important;
    border-radius: 5px !important;
  }

  .min-caption:before,
  .max-caption:before {
    content: "$";
    padding-right: 5px;
  }

  .max-caption:after {
    content: "${p => (p.rangeNumber == (p.opType ? 1000 : 500000) ? "+" : "")}";
    padding-right: 5px;
  }

  .labels .label {
    &:nth-child(1):before {
      content: "$";
      padding-right: 5px;
    }

    &:nth-child(2):before {
      content: "+$";
      padding-right: 5px;
    }
  }
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

export const DoubleSliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  margin-top: 30px;

  > input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    background-color: transparent;
    pointer-events: none;
  }

  > input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
  }

  > input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    height: 5px;
  }

  > input[type="range"]::-ms-track {
    appearance: none;
    height: 5px;
  }

  > input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.7em;
    width: 1.7em;
    background-color: #3264fe;
    cursor: pointer;
    margin-top: -9px;
    pointer-events: auto;
    border-radius: 50%;
  }

  > input[type="range"]::-moz-range-thumb {
    -webkit-appearance: none;
    height: 1.7em;
    width: 1.7em;
    cursor: pointer;
    border-radius: 50%;
    background-color: #3264fe;
    pointer-events: auto;
    border: none;
  }

  > input[type="range"]::-ms-thumb {
    appearance: none;
    height: 1.7em;
    width: 1.7em;
    cursor: pointer;
    border-radius: 50%;
    background-color: #3264fe;
    pointer-events: auto;
  }

  > input[type="range"]:active::-webkit-slider-thumb {
    background-color: #ffffff;
    border: 1px solid #3264fe;
  }
`

export const SliderTrack = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  border-radius: 5px;
`
