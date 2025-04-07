import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"
import { WrapperInput } from "../../../../config/theme/global-styles"
import { breakpoints } from "../../../../constants/breakpoints"

export const FormContainer = styled.div`
  grid-template-columns: repeat(2, 1fr);
  width: fit-content;
  min-width: 800px;
  display: grid;
  margin: auto;
  gap: 15px;
`

export const ContainerBodyCreate = styled.div``

export const CustomWrapperInput = styled(WrapperInput)`
  > label {
    span {
      color: ${palette.successColor};
      margin-left: 10px;
      font-weight: 900;
    }
  }
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;

  > button {
    border: 1px solid #d1d1d1;
    background: #efefef;
    border-radius: 40px;
    margin-top: 20px;
    font-weight: 600;
    max-width: 300px;
    color: black;
    width: 100%;

    ${breakpoints.tabletMediumMax} {
      max-width: 100%;
    }
  }
`

export const ContainerDragAndDrop = styled.div<{ isDragActive: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${p => (p.isDragActive ? palette.successColor : "#ebebeb")};
  border-radius: 10px;
  padding: 4px 14px;
  width: 100%;
  max-width: 400px;
  height: 47px;
  gap: 15px;

  > p {
    color: ${palette.grayColor};
    font-size: 14px;
  }

  &:focus-within {
    border-color: ${palette.primaryColor};
    // box-shadow: 0 0 8px rgba(245, 158, 54, 0.5); // Sombra cuando está enfocado
  }

  > svg {
    width: 100%;
    max-width: 20px;
  }
`

export const ContainerStepperCreate = styled.div`
  border-radius: 16px;
  padding: 60px 30px;
  max-width: 1000px;
  background: white;
  height: 100%;
  width: 100%;
`

export const ResidentialFormStyles = styled.div`
  > div {
    &:nth-child(2) {
      margin-top: 30px;
    }
  }
`

export const ContainerInputsSteps = styled.div`
  > div {
    margin-top: 20px;

    &:nth-child(2) {
      margin-top: 30px;
    }
  }
`

export const ContainerResFormStyles = styled.div`
  flex-direction: column;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const ContainerSwitchTwo = styled.div`
  flex-direction: column;
  display: flex;
  gap: 10px;

  > label {
    font-weight: 600;
  }
`

export const ContainerThreeInputs = styled.div`
  display: flex;
  gap: 10px;

  > div {
    width: calc(33% - 10px);
  }
`

export const ContainerTwoInputs = styled.div`
  display: flex;
  gap: 10px;

  > div {
    width: calc(50% - 10px);
  }
`
export const ContainerOneInputs = styled.div`
  display: flex;

  > div {
    width: 100%;
  }
`

export const ContainerUpInputs = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;
  margin-bottom: 20px;
  display: flex;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    flex-direction: column;
  }
`

export const ContainerDownInputs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  > div {
    &:nth-child(1) {
      width: 100%;
    }
    &:nth-child(2),
    &:nth-child(3) {
      width: 50%s;
    }
  }
`

export const SteppersStyles = styled.div<{ lenghtList: number }>`
  grid-template-columns: repeat(${p => p.lenghtList}, 1fr);
  margin-bottom: 40px;
  display: grid;
  width: 100%;
  gap: 20px;
`

export const ItemStepper = styled.div<{ isActive: boolean }>`
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 100%;
  gap: 8px;

  > div {
    > span {
      &:nth-child(1) {
        color: ${p => (p.isActive ? "white" : "#7A86A1")};
        background: ${p => (p.isActive ? "#032C29" : "white")};
        border: 1px solid ${p => (p.isActive ? "#032C29" : "#ebebeb")};
        // box-shadow: ${p =>
          p.isActive ? "8px 10px 30px 4px rgba(238, 236, 243, 1)" : "none"};
        border-radius: 50%;
        place-items: center;
        font-weight: 600;
        cursor: pointer;
        display: grid;
        height: 40px;
        width: 40px;
      }
    }
  }

  > span {
    &:nth-child(2) {
      color: ${p => (p.isActive ? "#032C29" : "#7A86A1")};
      font-weight: ${p => (p.isActive ? "800" : "300")};
    }
    &:nth-child(3) {
      background: #ebebeb;
      width: 100%;
      height: 2px;
    }
  }

  &:last-child {
    width: fit-content;
  }
`

export const ContainerCheckTypeProperty = styled.div<{ typeProperty: number }>`
  background: ${palette.inputBgColor};
  border: 1px solid ${palette.inputBorderolor};
  flex-direction: row;
  border-radius: 10px;
  transition: 0.2s;
  display: flex;
  height: 60px;

  > div {
    border-radius: 10px;
    transition: 0.2s;
    cursor: pointer;
    padding: 15px;
    width: 100%;

    &:nth-child(1) {
      background: ${p => p.typeProperty === 1 && palette.primaryColor};
      color: ${p => p.typeProperty === 1 && "white"};
    }
    &:nth-child(2) {
      background: ${p => p.typeProperty === 2 && palette.primaryColor};
      color: ${p => p.typeProperty === 2 && "white"};
    }
  }
`

export const ContainerUploadFiles = styled.div``

export const ContainerListFiles = styled.div`
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 6px;
`

export const ContainerSwitchs = styled.div`
  padding: 10px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`

export const ActionCreateSpan = styled.span`
  padding: 0 0 0 10px !important;
  display: inline-block;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    transform: scale(0.9);
  }
`

export const ContainerOperationPrice = styled.div``

export const StyckyContainer = styled.div`
  height: fit-content;
  position: sticky;
  z-index: 2;
  top: 30px;

  > h3 {
    margin-bottom: 20px;
  }
`

export const ContainerOperationForm = styled.div`
  grid-template-columns: 1fr 1fr;
  position: relative;
  display: grid;
  margin: auto;
  gap: 20px;

  &:nth-child(1) {
    > p {
      font-size: 0.9rem;
      margin-top: 15px;
    }
  }
  &:nth-child(2) {
    grid-template-columns: 1fr 1fr;
    display: grid;
    gap: 15px;
  }
`
export const ContainerOperationFormCondition = styled.div`
  grid-template-columns: 1fr 1fr;
  display: grid;
  gap: 20px;
`
export const WrapperEstimatedAmount = styled.div`
  > p {
    font-size: 0.8rem;
  }

  > div {
    background: #00c49a1a;
    border-radius: 20px;
    grid-template-columns: 1fr 1fr;
    position: relative;
    margin-top: 10px;
    display: grid;

    &:before {
      content: "";
      position: absolute;
      height: 100%;
      width: 1px;
      background: rgb(166, 166, 166);
      margin: auto;
      bottom: 0;
      right: 0;
      left: 0;
      top: 0;
    }

    > div {
      padding: 25px 20px;

      > p {
        flex-direction: column;
        align-items: left;
        font-weight: 800;
        font-size: 1.4rem;
        display: flex;

        > span {
          font-size: 0.7rem;
          font-weight: 400;
        }
      }
    }
  }
`

export const ItemCheckbox = styled.div<{ active: boolean }>`
  > div {
    border: 1px solid ${p => (p.active ? "#00c49a" : "#E1E1E1")};
    background: ${p => (p.active ? "#00c49a0d" : "white")};
    border-radius: 15px;
    min-width: 80px;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    padding: 15px 20px;
    display: flex;
    gap: 10px;

    > span {
      border: 1px solid ${palette.primaryColor};
      position: relative;
      border-radius: 50%;
      display: block;
      height: 20px;
      width: 20px;

      &:after {
        background: ${p => (p.active ? palette.primaryColor : "")};
        content: "";
        border-radius: 50%;
        position: absolute;
        margin: auto;
        height: 12px;
        width: 12px;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
      }
    }
  }
`

export const WhatsAppButtonFloat = styled.div`
  background: #00c49a;
  align-items: center;
  border-radius: 50px;
  padding: 15px 30px;
  transition: 0.3s;
  cursor: pointer;
  position: fixed;
  display: flex;
  bottom: 100px;
  right: 30px;
  gap: 10px;

  &:hover {
    transform: scale(0.98);
    background: rgb(15, 181, 145);
  }
`

export const ContainerInputsTwoStep = styled.div`
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  gap: 20px;
`
export const ButtonCreatePropertyForm = styled.div`
  background: linear-gradient(90deg, #52e1c3, rgb(41, 188, 156));
  text-decoration: none;
  border-radius: 50px;
  padding: 10px 20px;
  padding: 15px 50px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  color: black;
`

export const ButtonCreatePropertyFormFinal = styled(ButtonCreatePropertyForm)`
  max-width: 300px;
  margin: auto;
`

export const GridPropertyCreate = styled.div`
  grid-template-columns: 1fr 1fr;
  max-width: 1000px;
  display: grid;
  margin; auto;
  gap: 40px;

  > div {
    > div:nth-child(2) div {
      flex-direction: column;
      display: flex;

      > button {
        width: 100%;
      }
    }

    &:nth-child(2) img {
      max-width: 400px;
      width: 100%;
    }
  }
`

export const LeftPropertyCreate = styled.div`
  flex-direction: column;
  display: flex;
  gap: 25px;

  > div {
    flex-direction: column;
    display: flex;
    gap: 15px;

    > h2 {
      font-weight: 600;
    }
    > span {
      margin-top: 10px;
    }
  }
`

export const ContainerButtonsCreate = styled.div`
  flex-direction: column;
  max-width: 400px;
  display: flex;
  margin-top: 40px;

  > div {
    margin-top: 10px;
    text-align: center;
  }

  > button {
    border: 1px solid #d1d1d1;
    background: #efefef;
    border-radius: 40px;
    font-weight: 600;
    color: black;
    width: 100%;

    ${breakpoints.tabletMediumMax} {
      max-width: 100%;
    }
  }
`

export const ItemBoxOptions = styled.div`
  flex-direction: column;
  display: flex;
  gap: 15px;
`

export const ItemBoxDescription = styled.div`
  flex-direction: column;
  display: flex;
  gap: 15px;
`

export const CustomDetailCard = styled.div`
  flex-direction: column;
  background: #fafafa;
  border-radius: 20px;
  padding: 30px 20px;
  display: flex;
  gap: 20px;

  > img {
    max-width: 200px;
    width: 100%;
  }
`

export const ContainerBenefits = styled.div`
  flex-direction: column;
  display: flex;
  gap: 15px;
`

export const ItemBenefit = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 15px;

  > img {
    background: #00bf96;
    border-radius: 10px;
    padding: 6px;
    height: 40px;
    width: 40px;
  }

  > p {
    flex-direction: column;
    display: flex;
    gap: 15px;
    font-size: 0.9rem;

    > span {
      font-size: 0.8rem;
    }
  }
`
export const ContainerButtonCenter = styled.div`
  place-items: center;
  display: grid;
  width: 100%;

  > button {
    border: 1px solid #dcdcdc;
    background: #f6f6f6;
    border-radius: 60px;
    max-width: 300px;
    color: black;
    width: 100%;
  }
`
export const CustomOptionTF = styled.option`
  padding: 10px 20px;
  cursor: pointer;
`
