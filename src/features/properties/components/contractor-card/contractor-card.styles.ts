import styled from "styled-components"

export const ContainerCard = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  border-radius: 20px;
  background: white;
  padding: 20px;
`

export const ContainerHeadTitle = styled.div`
  margin-bottom: 20px;

  > h4 {
    font-size: 15px;
    font-weight: 400;

    > span {
      font-size: 35px;
      font-weight: 900;
    }
  }
`

export const ContainerDataContractors = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 70px);
  align-items: end;
  display: flex;
`

export const ContainerAvatar = styled.div`
  display: grid;
  place-items: center;
  width: 45px;
  height: 45px;
  background: #7a86a1;
  border-radius: 16px;
  color: white;
  border: 2px solid white;
  margin-left: -12px;

  &:nth-child(1) {
    margin-left: 0px;
  }
`

export const ContainerAvatarPlus = styled.div`
  display: grid;
  place-items: center;
  width: 45px;
  height: 45px;
  background: #343434;
  border-radius: 16px;
  color: white;
  border: 2px solid white;
  margin-left: -12px;
`
