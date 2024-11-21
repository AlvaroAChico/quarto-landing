import styled from "styled-components"

export const ContainerChat = styled.div`
  height: 85%;
  width: 100%;
`

export const ContainerMessage = styled.div<{ bg: string }>`
  background-image: url(${props => props.bg});
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  background-size: cover;
  align-items: center;
  border-radius: 10px;
  display: flex;
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
      max-width: 150px;
    }

    > p {
      margin-top: 20px;
      font-weight: 900;
      font-size: 1.6rem;
      color: #262626;
    }
  }
`
