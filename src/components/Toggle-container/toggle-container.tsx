import React from "react"
import { ToggleContainer, ToggleCircle } from "./toggle-container.style"

interface SwitchProps {
  isActive: boolean
  onToggle: () => void
  label: string
}

const Switch: React.FC<SwitchProps> = ({ isActive, onToggle, label }) => {
  return (
    <ToggleContainer isActive={isActive} onClick={onToggle}>
      <ToggleCircle isActive={isActive} />
      <span>{label}</span>
    </ToggleContainer>
  )
}

export default Switch
