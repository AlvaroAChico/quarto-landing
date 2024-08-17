import React from "react"
import {
  SwitchContainer,
  SwitchLabel,
  ToggleStyles,
} from "./custom-switch.styles"

interface SwitchProps {
  isActive: boolean
  onToggle: () => void
  label: string
}

const Switch: React.FC<SwitchProps> = ({ isActive, onToggle, label }) => {
  return (
    <SwitchContainer>
      <SwitchLabel>{label}</SwitchLabel>
      <ToggleStyles type="checkbox" checked={isActive} onChange={onToggle} />
    </SwitchContainer>
  )
}

export default Switch
