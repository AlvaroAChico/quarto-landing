import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"

export const ResidentialFormStyles = styled.div`
  background: white;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  border-radius: 20px;
  border: 1px solid ${palette.inputBorderolor};
`

export const ContainerTwoColumns = styled.div`
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  gap: 20px;
`

export const TitleCompanyForm = styled.div`
  > h3 {
    margin: 40px 0 0;
  }
`

export const ContainerResFormStyles = styled.div`
  flex-direction: column;
  max-width: 800px;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const ContainerSingleOption = styled.div<{ nroResponsible: number }>`
  grid-template-columns: repeat(2, 1fr);
  display: grid;
  gap: 20px;

  > div:nth-child(${props => props.nroResponsible}) {
    border: 1px solid #00c49a;
    background: #def7f2;
    font-weight: 600;
    color: #00c49a;

    &:before {
      border: 2px solid #00c49a;
    }
  }
`

export const ItemSingleOp = styled.div`
  border: 1px solid ${palette.inputBorderolor};
  padding: 20px 20px 20px 40px;
  border-radius: 10px;
  position: relative;
  cursor: pointer;

  &:before {
    border: 2px solid ${palette.inputBorderolor};
    background: ${palette.inputBgColor};
    border-radius: 50%;
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 20px;
  }
`
