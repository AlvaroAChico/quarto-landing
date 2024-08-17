import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/path"

const Projects: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(pathRoutes.PROJECTS.CREATE)
  }

  return (
    <div>
      <HeaderSection
        title="Projects"
        subtitle="List of projects"
        nameButton="Create"
        onPrimaryClick={handleClick}
      />
    </div>
  )
}

export default Projects
