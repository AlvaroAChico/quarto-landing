import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { pathRoutes } from "../../config/routes/path"
import { useNavigate } from "react-router-dom"

const Tasks: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(pathRoutes.PROJECTS.CREATE)
  }

  return (
    <div>
      <HeaderSection
        title="Tasks"
        subtitle="List of tasks"
        nameButton="Create"
        onPrimaryClick={handleClick}
      />
    </div>
  )
}

export default Tasks
