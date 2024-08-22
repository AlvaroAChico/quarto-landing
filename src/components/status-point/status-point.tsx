import React from "react"
import { PointStyles } from "./status-point.styles"

interface IOwnProps {
  isActive: boolean
}

const StatusPoint: React.FC<IOwnProps> = ({ isActive }) => {
  return <PointStyles isActive={isActive} />
}

export default StatusPoint
