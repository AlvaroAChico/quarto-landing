import { styled } from "styled-components"
import { palette } from "../../config/theme/theme"

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export const ModalContent = styled.div<{ customStyles: string }>`
  background: white;
  padding: 40px;
  border-radius: 15px;
  max-width: 800px;
  max-height: 85%;
  width: 90%;
  z-index: 12;
  position: relative;
  padding-top: 40px;
  overflow: auto;

  ${p => p.customStyles};
`

export const ContainerTitle = styled.div`
  width: 100%;
  padding: 10px 0 30px;

  > h3 {
    font-size: 25px;
    color: ${palette.primaryColor};
  }
`

export const CloseButton = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  top: 10px;
  right: 10px;
  cursor: pointer;
`
