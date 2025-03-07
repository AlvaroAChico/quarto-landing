import styled from "styled-components"
import { breakpoints } from "../../../../constants/breakpoints"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  transition: 0.3s;
  max-width: 350px;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: scale(0.95);
  }

  > div {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > img {
      width: 100%;
      border-radius: 50%;
      margin: auto;
      width: 200px;
      height: 200px;
      object-fit: cover;
      padding: 20px;
    }
  }

  ${breakpoints.tabletMediumMax} {
    max-width: none;
  }
`

export const ContainerHeadImage = styled.div<{ image: string }>`
  background-image: url(${p => p.image});
  border-radius: 20px 20px 0 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 200px;
`

export const ContainerInfo = styled.div`
  padding: 20px;

  > p {
    font-weight: 600;
  }

  > div {
    margin-top: 20px;
  }
`
