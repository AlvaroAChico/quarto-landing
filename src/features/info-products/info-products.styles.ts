import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const ContainerProducts = styled.div`
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  display: flex;
  gap: 20px;
`

export const ItemProduct = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
`

export const ContainerHeadCard = styled.div`
  margin-bottom: 20px;

  > h2 {
    color: ${palette.primaryColor};
    margin-bottom: 10px;
  }
`

export const ContainerSegurosAccordion = styled.div``
