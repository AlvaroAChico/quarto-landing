import styled from "styled-components"

export const ContainerNotFound = styled.div`
  height: 100vh;
  width: 100%;
`

export const ContainerBg = styled.div<{ bg: string }>`
  background-image: url(${props => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  background-size: cover;
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;

  > div {
    border-radius: 20px;
    text-align: center;
    background: white;
    padding: 60px;

    > img {
      width: 100%;
      max-width: 300px;
    }

    > p {
      margin-top: 20px;
      font-weight: 900;
      font-size: 1.4rem;
      color: #262626;
    }
  }
`
