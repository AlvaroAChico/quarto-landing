import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerFullComponentComplete = styled.div``

export const ContainerFullComponent = styled.div`
  width: fit-content;
  max-width: 700px;
  min-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  > img {
    margin-bottom: 20px;
    max-width: 150px;
    width: 100%;
  }

  > h2 {
    font-weight: 800;
    font-size: 1.6rem;
  }

  > div p {
    font-weight: 100;
    font-size: 0.8rem;
    margin: 10px 0;
  }
`

export const OptionsSignIn = styled.div`
  flex-direction: column;
  margin-top: 40px;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const CompleteRegisterButton = styled.div``

export const ButtonSignIn = styled.button`
  color: black;
  border-radius: 20px;
  font-size: 0.8rem;
  width: 100%;
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  border: none;
  align-items: center;
  justify-content: center;
  gap: 10px;
  outline: none;
`

export const SignInWithGoogle = styled(ButtonSignIn)`
  background: linear-gradient(90deg, #52e1c3, #52e1c3);
`
export const SignInWithEmail = styled(ButtonSignIn)`
  border: 1px solidrgb(221, 221, 221);
  background: #f6f6f6;

  &:disabled {
    cursor: not-allowed;
    color: gray;
    background: #f6f6f6;
  }
`

export const OtherOptions = styled.div`
  margin-top: 40px;
  text-align: center;
  font-weight: 700;
  width: 100%;

  > p span {
    color: ${palette.primaryColor};
    cursor: pointer;
  }
`

export const ContainerOptionsLike = styled.div`
  justify-content: space-between;
  flex-direction: row;
  algn-items: center;
  margin: 10px 0 20px;
  display: flex;
  gap: 20px;
`

export const ItemOptionLike = styled.div<{ active: boolean }>`
  border: 2px solid ${p => (p.active ? "#00C49A" : "#E1E1E1")};
  color: ${p => (p.active ? "#00C49A" : "##032C29")};
  background: ${p => (p.active ? "#00c49a0d" : "white")};
  place-items: center;
  border-radius: 20px;
  cursor: pointer;
  padding: 20px;
  display: grid;
  gap: 10px;
`

export const ContainerFormRegister = styled.div`
  // flex-direction: column;
  // margin-top: 40px;
  // display: flex;
  // gap: 20px;
`

export const ContainerFormRegisterIdentity = styled(ContainerFormRegister)`
  margin-top: 0;
`

export const ItemFormReg = styled.div`
  > div {
    flex-direction: row;
    margin-top: 10px;
    display: flex;
    gap: 20px;
  }
`

export const ContainerCheckEmail = styled.div`
  flex-direction: column;
  margin-top: 10px;
  display: flex;
  gap: 20px;
  max-width: 400px;
  margin: auto;

  > img {
    max-width: 250px;
  }
`

export const ContainerTwoColumns = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 10px;
`
