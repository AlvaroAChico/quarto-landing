import styled from "styled-components"

export const ContainerCard = styled.div<{ activeCard: boolean }>`
  background: ${({ activeCard }) =>
    activeCard ? "linear-gradient(90deg, #1CC9A4 0%, #78DCC6 100%)" : "white"};
  color: ${({ activeCard }) => (activeCard ? "white" : "black")};
  border-radius: 10px;
  padding: 15px;

  > div div:nth-child(2) {
    background: ${({ activeCard }) => (activeCard ? "#89E1CE" : "#F4F4F4")};
    place-items: center;
    border-radius: 14px;
    display: grid;
    padding: 10px;

    > img {
      max-width: 20px;
    }
  }
`

export const ContainerUpInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  > div {
    span {
      font-size: 0.8rem;
    }
  }
`

export const ContainerAmount = styled.div`
  margin-bottom: 10px;

  > span {
    font-size: 1.6rem;
    font-weight: 900;
  }
`

export const ContainerDate = styled.div`
  > span {
    font-size: 0.8rem;
  }
`
