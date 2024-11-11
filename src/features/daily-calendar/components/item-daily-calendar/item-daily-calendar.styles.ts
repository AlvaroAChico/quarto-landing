import styled from "styled-components"
import { EServiceName } from "../../../../core/models/interfaces/services-model"
import { palette } from "../../../../config/theme/theme"
import { breakpoints } from "../../../../constants/breakpoints"

export const ItemCalendarStyles = styled.div<{ $service: string }>`
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 16px;
  flex-direction: row;
  position: relative;
  position: relative;
  padding: 10px 20px;
  display: flex;
  z-index: 0;
  gap: 15px;

  &:before {
    content: "${p => p.$service}";
    text-transform: uppercase;
    position: absolute;
    font-weight: 900;
    color: #ffffff21;
    font-size: 35px;
    z-index: 1;
    bottom: -6px;
    right: 4px;
  }

  ${p =>
    p.$service.toLowerCase() == EServiceName.CLEAN.toLowerCase()
      ? "background: #9fa5f7;"
      : ""}
  ${p =>
    p.$service.toLowerCase() == EServiceName.PAINT.toLowerCase()
      ? "background: #efb851;"
      : ""}
  ${p =>
    p.$service.toLowerCase() == EServiceName.MISCELLANEOUS.toLowerCase()
      ? "background: #C0BDCC;"
      : ""}
  ${p =>
    p.$service.toLowerCase() == EServiceName.RESURFACING.toLowerCase()
      ? "background: #66a3d9;"
      : ""}

  ${breakpoints.tabletLargeMax} {
    flex-direction: column;
  }
`

export const InfoCardDaily = styled.div`
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

export const InfoTextDaily = styled.div`
  flex-direction: column;
  display: flex;
  gap: 2px;

  > div {
    position: relative;
    font-size: 10px;
    color: white;
    z-index: 2;

    &:nth-child(1) {
      display: flex;
      gap: 5px;

      > span {
        &:nth-child(1) {
          background: #2d7c7d;
          border-radius: 20px;
          font-size: 10px;
          padding: 4px 10px;
          color: white;
        }
        &:nth-child(2) {
          background: ${palette.errorColor};
          border-radius: 20px;
          font-size: 10px;
          padding: 4px 10px;
          color: white;
        }
        &:nth-child(3) {
          background: ${palette.successColor};
          border-radius: 20px;
          padding: 4px 10px;
          font-size: 10px;
          cursor: pointer;
          color: white;

          > svg {
            max-width: 12px;
            min-width: 8px;
            width: 100%;
          }
        }

        ${breakpoints.tabletLargeMax} {
          display: grid;
          place-items: center;
        }
      }
    }
    &:nth-child(2) {
      flex-direction: column;
      display: flex;

      > span {
        &:nth-child(1) {
          font-size: 20px;
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

export const ActionsItemsDaily = styled.div`
  flex-direction: row;
  display: flex;
  gap: 10px;
  height: 100%;
`

export const BtnActionsDaily = styled.div`
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

export const BtnApprovedDaily = styled(BtnActionsDaily)`
  background: ${palette.successColor};

  &:hover {
    background: ${palette.successColorHover};
  }
`
export const BtnRejectedDaily = styled(BtnActionsDaily)`
  background: ${palette.errorColor};

  &:hover {
    background: ${palette.errorColorHover};
  }
`
export const BtnCompletedDaily = styled(BtnActionsDaily)`
  background: ${palette.successColor};

  &:hover {
    background: ${palette.successColorHover};
  }
`

export const ActionStyles = styled.div`
  place-items: center;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  display: grid;
  height: 30px;
  width: 30px;

  > svg {
    color: ${palette.grayDarkColor};
    max-width: 15px;
    width: 100%;
  }
`

export const EditStyles = styled(ActionStyles)`
  background: #e9e928;
  left: -8px;
  top: -8px;
`

export const DeleteStyles = styled(ActionStyles)`
  background: #f5a8a8;
  left: -8px;
  top: 28px;
`

export const JobStatusStyle = styled.div<{ status: number }>`
  border-bottom-color: transparent;
  background: transparent;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 50%;
  height: 35px;
  width: 35px;

  ${p => (p.status == 7 ? "color: green;" : "")};
  ${p => (p.status == 4 ? "color: #ff0d00;" : "")};
`

export const ContainerFilesView = styled.div`
  padding: 15px;

  > h3 {
    margin-left: -15px;
    margin-bottom: 10px;
  }

  > ol {
    > li {
      > span {
        a {
          text-decoration: none !important;
          color: ${palette.errorColor};
          padding-left: 6px;
          font-weight: 600;
        }
      }
    }
  }
`
