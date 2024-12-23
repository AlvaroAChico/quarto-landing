import React from "react"
import { TooltipContainer } from "./tooltip.styles"

interface TooltipProps {
  visible: boolean
  content: string
  x: number
  y: number
}

const Tooltip: React.FC<TooltipProps> = ({ visible, content, x, y }) => {
  if (!visible) return null
  return (
    <TooltipContainer style={{ top: y, left: x }}>{content}</TooltipContainer>
  )
}

export default Tooltip
