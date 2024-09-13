import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { EServiceName } from "../../core/models/interfaces/services-model"

export const ContainerCalendar = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  place-items: center;
  border-radius: 16px;
  max-width: 1000px;
  padding: 20px;
  display: grid;
`

export const ContainerDaysStyles = styled.div`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 50px;

  > div {
    > span {
      > svg {
        max-width: 30px;
        cursor: pointer;
        padding: 5px;
        width: 100%;
      }
    }

    &:nth-child(1) {
      place-items: center;
      display: grid;
    }

    &:last-child {
      place-items: center;
      display: grid;
    }
  }
`

export const ItemDay = styled.div<{ isActiveDay: boolean }>`
  background: ${p => (p.isActiveDay ? palette.orangeColor : "white")};
  box-shadow: ${p =>
    p.isActiveDay ? "8px 10px 30px 4px rgb(223 215 243 / 80%)" : "none"};
  color: ${p => (p.isActiveDay ? "white" : "black")};
  outline: 1px solid ${p => (p.isActiveDay ? palette.orangeColor : "white")};
  flex-direction: column;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  padding: 15px 12px;

  &:hover {
    outline: 1px solid ${palette.orangeColor};
  }

  > span {
    text-align: center;

    &:nth-child(1) {
      font-size: 10px;
      color: black;
    }

    &:nth-child(2) {
      font-weight: 600;
      font-size: 16px;
    }
  }
`

export const ContainerListData = styled.div`
  flex-direction: column;
  padding: 20px;
  display: flex;
  width: 100%;
  gap: 10px;
  background-image: linear-gradient(rgb(187 187 187 / 24%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(219 219 219 / 30%) 1px, transparent 1px);
  background-size: 120px 80px;
  border: 1px solid #f0f0f0;
  margin-top: 20px;
`

export const ItemGeneralInfo = styled.div<{ service: string }>`
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  position: relative;
  display: flex;
  padding: 10px 20px;
  gap: 15px;

  ${p =>
    p.service.toUpperCase() == EServiceName.CLEAN ? "background: #9fa5f7;" : ""}
  ${p =>
    p.service.toUpperCase() == EServiceName.PAINT ? "background: #F58732;" : ""}
  ${p =>
    p.service.toUpperCase() == EServiceName.MISCELLANEOUS
      ? "background: #C0BDCC;"
      : ""}
  ${p =>
    p.service.toUpperCase() == EServiceName.RESURFACING
      ? "background: #2BC149;"
      : ""}

  &:before {
    content: "${p => p.service}";
    text-transform: uppercase;
    position: absolute;
    font-weight: 900;
    color: #ffffff21;
    font-size: 35px;
    z-index: 1;
    bottom: 0;
    right: 0;
  }

  > div {
    border-radius: 16px;

    > img {
      background: ${palette.grayLightColor};
      border-radius: 12px;
      object-fit: cover;
      height: 45px;
      width: 45px;
    }
  }
`

export const InfoTextStyles = styled.div`
  flex-direction: column;
  display: flex;
  gap: 2px;

  > div {
    position: relative;
    z-index: 2;

    &:nth-child(1) {
      display: flex;
      gap: 5px;

      > span {
        &:nth-child(1) {
          background: ${palette.infoColor};
          border-radius: 20px;
          font-size: 8px;
          padding: 2px 10px;
          color: white;
        }
        &:nth-child(2) {
          background: ${palette.errorColor};
          border-radius: 20px;
          font-size: 8px;
          padding: 2px 10px;
          color: white;
        }
      }
    }
    &:nth-child(2) {
      flex-direction: column;
      display: flex;

      > span {
        &:nth-child(1) {
          font-size: 18px;
          color: ${palette.grayDarkColor};
          font-weight: 900;
        }
        &:nth-child(2) {
          // color: ${palette.grayColor};
          color: white;
          text-transform: capitalize;
          font-weight: 400;
          font-size: 10px;
        }
      }
    }
  }
`
