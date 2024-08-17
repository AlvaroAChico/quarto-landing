import React from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/path"
import HeaderSection from "../../components/header-section/header-section"

const Calendar: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(pathRoutes.PROJECTS.CREATE)
  }

  return (
    <div>
      <HeaderSection title="Calendar" />
    </div>
  )
}

export default Calendar
