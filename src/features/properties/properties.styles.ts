import styled from "styled-components"
import { palette } from "../../config/theme/theme"
import { breakpoints } from "../../constants/breakpoints"

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
export const MoreResults = styled.div`
  place-items: center;
  display: grid;
  padding: 40px 20px;

  > button {
    border: 1px solid #e1e1e1;
    border-radius: 40px;
    padding: 20px 40px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      transform: scale(0.98);
    }
  }
`

export const SectionRoute = styled.div`
  max-width: 1200px;
  margin: auto;
`

export const NameStylesTD = styled.td`
  > div {
    flex-direction: row;
    display: flex;
    gap: 10px;

    > span {
      > img {
        border-radius: 16px;
        object-fit: cover;
        width: 50px;
        height: 50px;
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2px;

      > span {
        &:nth-child(2) {
          color: ${palette.grayColor};
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

export const ContainerOffer = styled.div`
  background: ${palette.blueColor};
  color: ${palette.whiteColor};
  flex-direction: column;
  border-radius: 15px;
  padding: 40px;
  display: flex;
  gap: 10px;

  > h3 {
    font-size: 2.6rem;
    font-weight: 800;
  }

  > p {
    font-size: 1.2rem;
    font-weight: 200;
  }
`

export const ContainerListProperties = styled.div`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  display: grid;
  gap: 20px;

  ${breakpoints.tabletLargeMax} {
    grid-template-columns: 1fr 1fr;
  }

  ${breakpoints.tabletSmallMax} {
    grid-template-columns: 1fr;
  }
`

export const MoreFilterItem = styled.div`
  justify-content: space-between;
  border: 1px solid #e1e1e1;
  background: #f0f0f0;
  align-items: center;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 0.8rem;
  font-weight: 700;
  min-height: 60px;
  cursor: pointer;
  display: flex;
  height: 100%;
  gap: 8px;

  > img {
    max-width: 12px;
    width: 100%;
  }
`

export const ContainerProperties = styled.div`
  padding: 30px;
`

export const MoreFilterDrawer = styled.div<{ isActiveFilters: boolean }>`
  transform: ${p =>
    p.isActiveFilters ? "translateX(0%)" : "translateX(-100%)"};
  background: rgba(0, 0, 0, 0.58);
  transition: 0.3s;
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1;
  left: 0;
  top: 0;
`

export const FiltersDrawer = styled.div`
  grid-template-rows: 1fr fit-content(100%);
  position: absolute;
  background: white;
  padding: 10px 30px 20px;
  height: 100vh;
  display: grid;
  width: 480px;
  z-index: 1;
  left: 0;
  top: 0;
`

export const SearchButtonsOption = styled.div`
  flex-direction: row;
  display: flex;
  gap: 20px;
`

export const ResetFiltersButton = styled.div`
  border-radius: 40px;
  background-color: #f6f6f6;
  border: 1px solid #e1e1e1;
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
  cursor: pointer;
  display: grid;
  align-items: center;
  text-align: center;
`

export const SearchWithFiltersButton = styled.div`
  border-radius: 40px;
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
  cursor: pointer;
  display: grid;
  align-items: center;
  text-align: center;
`
