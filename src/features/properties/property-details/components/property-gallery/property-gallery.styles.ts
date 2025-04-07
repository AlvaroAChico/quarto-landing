import styled from "styled-components"
import { breakpoints } from "../../../../../constants/breakpoints"

export const GalleryContainer = styled.section`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  position: relative;
  display: grid;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    grid-template-columns: 1fr;
  }
`

export const MainImage = styled.img`
  border-radius: 8px 0 0 8px;
  object-position: center;
  object-fit: cover;
  cursor: pointer;
  height: 100%;
  width: 100%;

  ${breakpoints.tabletMediumMax} {
    border-radius: 8px;
    max-height: 300px;
    width: 100%;
  }
`

export const PetTag = styled.span`
  position: absolute;
  left: 16px;
  top: 16px;
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #242424;
`

export const AdditionalImagesGrid = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  display: grid;
  gap: 20px;

  > * img {
    cursor: pointer;
  }

  > div {
    &:nth-child(2) > img {
      border-radius: 0 8px 0 0;
    }

    &:nth-child(4) > img {
      border-radius: 0 0 8px 0;
    }
  }

  ${breakpoints.tabletMediumMax} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;

    > div {
      > img {
        border-radius: 8px !important;
      }
    }
  }
`

export const ImageWrapper = styled.div`
  place-items: center;
  position: relative;
  cursor: pointer;
  display: grid;
  height: 100%;
  width: 100%;
`

export const GridImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

export const ViewAllOverlay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0 0 8px 0;
  place-items: center;
  position: absolute;
  display: grid;
  height: 100%;
  width: 100%;
  color: white;

  > div {
    flex-direction: row;
    align-items: center;
    font-size: 0.8rem;
    display: flex;
    gap: 10px;

    > div {
      place-items: center;
      border-radius: 50%;
      background: white;
      display: grid;
      padding: 8px;
      height: 30px;
      width: 30px;

      > img {
        max-width: 20px;
        width: 100%;
      }
    }
  }

  ${breakpoints.tabletLargeMax} {
    > div {
      flex-direction: column;
    }
  }

  ${breakpoints.tabletMediumMax} {
    border-radius: 8px !important;

    > div {
      > div {
        height: 25px;
        width: 25px;
      }

      > span {
        font-size: 0.6rem;
      }
    }
  }
`
