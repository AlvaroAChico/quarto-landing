import styled from "styled-components"
import { palette } from "../../../config/theme/theme"

export const ContainerPaginated = styled.div`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
  display: flex;
  width: 100%;
  gap: 10px;
`
export const CountPagesTotal = styled.span``

export const GeneralButton = styled.button`
  background-color: #efefef;
  border-radius: 3px;
  transition: 0.4s;
  cursor: pointer;
  padding: 5px;
  border: none;

  &:hover {
    transform: scale(0.9);
  }

  > svg {
    width: 100%;
    max-width: 25px;
  }
`
export const BtnFirst = styled(GeneralButton)``
export const BtnPrevious = styled(GeneralButton)`
  //   background-color: ${palette.secondaryColor};
`
export const BtnNext = styled(GeneralButton)`
  //   background-color: ${palette.secondaryColor};
`
export const BtnLast = styled(GeneralButton)``
