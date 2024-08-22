import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/path"
import {
  ContainerActions,
  ContainerBody,
  ContainerHead,
  ContainerTable,
} from "./projects.styles"
import Cookies from "js-cookie"
import { ProjectDTO } from "../../core/models/interfaces/project-model"
import { COOKIES_APP } from "../../constants/app"
import axios from "axios"
import { toast } from "sonner"
import { Edit } from "styled-icons/fluentui-system-filled"
import { Trash } from "styled-icons/bootstrap"

const Projects: React.FC = () => {
  const [listProjects, setListProjects] = React.useState<ProjectDTO[]>([])
  const navigate = useNavigate()

  const handleEditProject = (projectId: string) => () =>
    navigate(`/role/${projectId}`)

  const handleDeleteProject = (projectId: string) => () =>
    console.log("Delete project -> ", projectId)

  const handleClick = React.useCallback(() => {
    navigate(pathRoutes.PROJECTS.CREATE)
  }, [])

  React.useEffect(() => {
    const storedToken = Cookies.get(COOKIES_APP.TOKEN_APP)

    if (storedToken) {
      axios
        .get("http://localhost:3000/projects", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: ProjectDTO[] = response.data as ProjectDTO[]
          setListProjects(listData)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          console.log(
            "Error Axios GET -> ",
            err.response ? err.response.data : err,
          )
        })
    }
  }, [])

  return (
    <div>
      <HeaderSection
        title="Projects"
        subtitle="List of projects"
        nameButton="Create"
        onPrimaryClick={handleClick}
      />
      <ContainerTable>
        <ContainerHead>
          <tr>
            <td></td>
            <td>Nº</td>
            <td>Name</td>
            <td>Actions</td>
          </tr>
        </ContainerHead>
        <ContainerBody>
          {/* <UsersContainer> */}
          {(listProjects || []).map((project, index) => (
            <tr>
              <td></td>
              <td>{index + 1}</td>
              <td>{project.name} </td>
              <ContainerActions>
                <div onClick={handleEditProject(`${project.id}`)}>
                  <Edit />
                </div>
                <div onClick={handleDeleteProject(`${project.id}`)}>
                  <Trash />
                </div>
              </ContainerActions>
            </tr>
          ))}
          {/* </UsersContainer> */}
        </ContainerBody>
      </ContainerTable>
    </div>
  )
}

export default Projects
