import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const CardStadistics = styled.div`
  flex-direction: row;
  display: flex;
  gap: 40px;
`

export const ContentStylesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export const SectionRoute = styled.div``

export const ContainerFilters = styled.div`
  justify-content: space-between;
  flex-direction: row;
  display: flex;
  padding: 20px 10px 30px;
`

export const NameStylesTD = styled.td`
  > div {
    flex-direction: column;
    display: flex;
    gap: 2px;

    > span {
      &:nth-child(1) {
        font-size: 14px;
        font-weight: 500;
      }
      &:nth-child(2) {
        color: ${palette.grayColor};
        font-size: 12px;
        font-weight: 200;
      }
    }
  }
`

export const ProgressStylesTD = styled.td<{ progress: number }>`
  > div {
    > span {
      color: ${palette.grayColor};
      font-size: 12px;
      font-weight: 500;

      &:nth-child(1) {
        font-size: 14px;
        color: black;
      }
    }

    > div {
      background: ${palette.grayLightColor};
      border-radius: 20px;
      position: relative;
      height: 4px;
      width: 100%;

      &:before {
        content: "";
        position: absolute;
        border-radius: 20px;
        background: ${p =>
          p.progress < 30
            ? palette.errorColor
            : p.progress > 30 && p.progress < 70
              ? palette.orangeColor
              : palette.successColor};
        height: 4px;
        width: ${p => p.progress}%;
        top: 0;
      }
    }
  }
`
export const ClientStylesTD = styled.td`
  > div {
    width: fit-content;
    min-width: 80px;

    > span {
      color: ${palette.grayColor};
      font-size: 12px;
      font-weight: 500;

      > svg {
        width: 100%;
        max-width: 15px;
      }
    }
  }
`
export const DateStylesTD = styled.td`
  > div {
    > span {
      color: ${palette.grayColor};
      font-size: 12px;
      font-weight: 500;
    }
  }
`
