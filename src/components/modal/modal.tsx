import React from "react"
import ReactDOM from "react-dom"
import { CloseButton, ModalContent, ModalOverlay } from "./modal.styles"

interface IOwnProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<IOwnProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null // Si el modal no está abierto, no renderizar nada

  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("root") as HTMLElement, // Asegúrate de crear este nodo en tu HTML
  )
}

export default Modal
