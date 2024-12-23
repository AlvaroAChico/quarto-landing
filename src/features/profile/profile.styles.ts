import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerProfile = styled.div`
  border-radius: 20px;
  background: white;
  padding: 20px;
`

export const OptionsProfile = styled.div`
  justify-content: right;
  margin-bottom: 20px;
  max-width: 1000px;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const HeaderProfile = styled.div`
  flex-direction: row;
  align-items: center;
  max-width: 1000px;
  display: flex;
  gap: 20px;
`
export const ContainerImage = styled.div`
  border-radius: 50%;
  height: 160px;
  width: 160px;

  > div * {
    border-radius: 50%;
  }
`
export const ContainerInfoUp = styled.div`
  > p {
    &:nth-child(1) {
      color: ${palette.primaryColor};
      font-style: italic;
      font-weight: 600;
      font-size: 0.8rem;
    }

    &:nth-child(2) {
      color: ${palette.primaryColor};
      font-weight: 800;
      font-size: 1.8rem;
    }
  }

  > span {
    color: ${palette.blackColor};
    font-size: 0.8rem;
    font-weight: 400;
  }
`

export const BodyProfile = styled.div`
  max-width: 1000px;
  margin-top: 40px;
`

export const ColumnItemProfile = styled.div`
  flex-direction: row;
  padding: 5px 0;
  display: flex;
  gap: 20px;

  > p {
    min-width: 300px;
    width: 100%;
  }
`

export const PassportContainer = styled.div`
  margin-top: 30px;

  > p {
    color: ${palette.secondaryColor};
    margin-bottom: 20px;
  }
`

export const ContainerImages = styled.div`
  flex-direction: row;
  display: flex;
  gap: 20px;
`

export const ItemImage = styled.div`
  border: 1px solid black;
  place-items: center;
  border-radius: 20px;
  position: relative;
  width: fit-content;
  display: grid;
  height: 100%;

  > img {
    border-radius: 10px;
    objecfd-fit: cover;
  }
`

export const CloseImage = styled.div`
  background: #ff7b71;
  place-items: center;
  position: absolute;
  border-radius: 50%;
  display: grid;
  height: 22px;
  right: -5px;
  width: 22px;
  top: -5px;

  > svg {
    max-width: 15px;
    color: white;
    width: 100%;
  }
`
