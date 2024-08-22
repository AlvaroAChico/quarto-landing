import React from "react"
import ReactDOM from "react-dom"
import {
  CloseButton,
  ContainerTitle,
  ModalContent,
  ModalOverlay,
} from "./modal.styles"
import { Close } from "styled-icons/evaicons-solid"

interface IOwnProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<IOwnProps> = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null // Si el modal no está abierto, no renderizar nada

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        {!!title && (
          <ContainerTitle>
            <h3>{title}</h3>
          </ContainerTitle>
        )}
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("root") as HTMLElement, // Asegúrate de crear este nodo en tu HTML
  )
}

export default Modal
