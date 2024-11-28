import React from "react"
import {
  ContainerAllSwitch,
  SwitchContainer,
  ToggleStyles,
} from "./switch.styles"

interface SwitchProps {
  label: string
  isActive: boolean
  isEnabled: boolean
  onToggle: () => void
}

const Switch: React.FC<SwitchProps> = ({
  isActive,
  isEnabled,
  onToggle,
  label,
}) => {
  const handleChangeTogle = React.useCallback(() => {
    if (isEnabled) {
      onToggle()
    }
  }, [isEnabled, onToggle])

  return (
    <ContainerAllSwitch>
      <span>{label}</span>
      <SwitchContainer
        isActive={isActive}
        isEnabled={isEnabled}
        onClick={onToggle}
        label={label}
      >
        <ToggleStyles
          type="checkbox"
          checked={isActive}
          onChange={handleChangeTogle}
        />
        <label htmlFor="toggle"></label>
        <span>{isEnabled ? "Si" : "No"}</span>
      </SwitchContainer>
    </ContainerAllSwitch>
  )
}

export default Switch
