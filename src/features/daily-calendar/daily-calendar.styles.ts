import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { breakpoints } from "../../constants/breakpoints"

export const ContainerDailyCalendar = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  max-width: 1000px;
  padding: 20px;
  display: flex;

  ${breakpoints.tabletLargeMax} {
    padding: 10px;
  }
`

export const FilterDailyCalendar = styled.div`
  justify-content: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;
  display: flex;
  padding: 10px;
  width: 100%;
  gap: 10px;

  > div:nth-child(1) {
    display: none;
  }

  ${breakpoints.tabletLargeMax} {
    flex-direction: row;
    align-items: center;
    gap: 10px;

    > div {
      width: 48%;
    }

    > div:nth-child(1) {
      display: flex;
      width: 100%;

      > button {
        width: 100%;
      }
    }

    > div:last-child {
      display: none;
    }
  }
`
export const DataDailyCalendar = styled.div`
  width: 80%;
`

export const ItemFilterDC = styled.div`
  padding: 5px;

  ${breakpoints.tabletLargeMax} {
    padding: 0;
  }
`

export const HeaderDailyCalendar = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`
export const ContainerDailyStyles = styled.div`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 35px;

  > div {
    > span {
      > svg {
        width: 30px;
        cursor: pointer;
        padding: 5px;
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

export const BodyDailyCalendar = styled.div`
  flex-direction: column;
  padding: 40px 20px;
  display: flex;
  gap: 10px;

  ${breakpoints.tabletLargeMax} {
    padding: 20px 0;
  }
`

export const ItemDaily = styled.div<{ $isActiveDay: boolean }>`
  background: ${p => (p.$isActiveDay ? palette.orangeColor : "white")};
  box-shadow: ${p =>
    p.$isActiveDay ? "8px 10px 30px 4px rgb(223 215 243 / 80%)" : "none"};
  color: ${p => (p.$isActiveDay ? "white" : "black")};
  outline: 1px solid ${p => (p.$isActiveDay ? palette.orangeColor : "white")};
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
      font-size: 18px;
    }
  }
`
