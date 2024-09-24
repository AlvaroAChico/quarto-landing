import styled from "styled-components"
import { palette } from "../../../config/theme/theme"
import { EServiceName } from "../../../core/models/interfaces/services-model"

export const ItemGeneralInfo = styled.div<{ service: string }>`
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-start;
  // align-items: center;
  border-radius: 16px;
  position: relative;
  padding: 10px 20px;
  display: flex;
  z-index: 0;
  gap: 15px;

  ${p =>
    p.service.toLowerCase() == EServiceName.CLEAN.toLowerCase()
      ? "background: #9fa5f7;"
      : ""}
  ${p =>
    p.service.toLowerCase() == EServiceName.PAINT.toLowerCase()
      ? "background: #efb851;"
      : ""}
  ${p =>
    p.service.toLowerCase() == EServiceName.MISCELLANEOUS.toLowerCase()
      ? "background: #C0BDCC;"
      : ""}
  ${p =>
    p.service.toLowerCase() == EServiceName.RESURFACING.toLowerCase()
      ? "background: #66a3d9;"
      : ""}

  &:before {
    content: "${p => p.service}";
    text-transform: uppercase;
    position: absolute;
    font-weight: 900;
    color: #ffffff21;
    font-size: 35px;
    z-index: 1;
    bottom: -6px;
    right: 4px;
  }
`

export const InfoCardStyles = styled.div`
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  position: relative;
  display: flex;
  gap: 15px;

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
          background: #2d7c7d;
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

export const ActionsItems = styled.div`
  flex-direction: row;
  display: flex;
  gap: 10px;
  height: 100%;
`

export const BtnActionStyles = styled.div`
  border: 2px solid white;
  justify-content: center;
  border-radius: 15px;
  align-items: center;
  position: relative;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  color: white;
  z-index: 1;
  gap: 4px;

  > svg {
    max-width: 20px;
    width: 100%;
  }
`

export const BtnApprovedStyles = styled(BtnActionStyles)`
  background: ${palette.successColor};

  &:hover {
    background: ${palette.successColorHover};
  }
`
export const BtnRejectedStyles = styled(BtnActionStyles)`
  background: ${palette.errorColor};

  &:hover {
    background: ${palette.errorColorHover};
  }
`
export const BtnCompletedStyles = styled(BtnActionStyles)`
  background: ${palette.successColor};

  &:hover {
    background: ${palette.successColorHover};
  }
`

export const ChangeStyles = styled.div`
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 10px;

  > span svg {
    width: 100%;
    max-width: 20px;
    cursor: pointer;
  }
`
