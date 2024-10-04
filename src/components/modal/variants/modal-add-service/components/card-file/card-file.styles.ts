import styled from "styled-components"
import { palette } from "../../../../../../config/theme/theme"

export const CardFileStyles = styled.div`
  border: 1px solid ${palette.grayLightColor};
  flex-direction: column;
  border-radius: 10px;
  height: fit-content;
  position: relative;
  max-width: 100px;
  display: flex;
  padding: 10px;
  width: 100%;
  color: red;
  gap: 10px;

  > div {
    flex-direction: column;
    display: flex;
    gap: 5px;

    > img {
      max-width: 40px;
      width: 100%;
      margin: auto;
    }

    > span {
      &:nth-child(1) {
        color: ${palette.infoColor};
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100px;
        overflow: hidden;
        font-size: 12px;
        display: block;
      }
      &:nth-child(2) {
        color: ${palette.successColor};
        font-size: 12px;
      }
    }
  }
`

export const CloseStyles = styled.div`
  background: ${palette.errorColor};
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
  color: white;
  right: -5px;
  top: -5px;
`
