import styled from "styled-components"
import { palette } from "../../config/theme/theme"

export const CardFileStyles = styled.div`
  height: 150px;
  width: 150px;
  min-height: 150px;
  min-width: 150px;
  max-height: 150px;
  max-width: 150px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  > img {
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }

  &:hover {
    > div {
      transform: translate(0%);
    }
  }
`

export const OverlayFile = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.45);
  transform: translate(-100%);
  place-items: center;
  transition: 0.3s;
  cursor: pointer;
  display: grid;
  margin: auto;
  height: 100%;
  width: 100%;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;

  > span {
    border: 1px solid white;
    padding: 10px 10px;
    border-radius: 20px;
    font-size: 0.6rem;
    width: 100%;
    max-width: 100px;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    > img {
      transform: scale(1.05);
    }
  }
`
export const PrincipalTag = styled.div`
  position: absolute;
  background: #00000066;
  top: 6px;
  left: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
`
