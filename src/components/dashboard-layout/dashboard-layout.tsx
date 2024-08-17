import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {
  ContainerAvatar,
  ContainerBreadcrumb,
  ContainerDashboardLayout,
  ContainerDataProfile,
  ContainerLogo,
  ContainerMenu,
  ContainerOutlet,
  ContainerSidebar,
  ContainerUser,
  ItemMenu,
} from "./dashboard-layout.styles"
import ImgLogo from "../../assets/img/logo.webp"
// Icons
import { User } from "@styled-icons/boxicons-regular/User"
import { LocalPolice } from "@styled-icons/material/LocalPolice"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { Task } from "@styled-icons/boxicons-regular/Task"
import { Calendar } from "@styled-icons/bootstrap/Calendar"
import { BarChartFill } from "@styled-icons/bootstrap/BarChartFill"
import { pathRoutes } from "../../config/routes/path"

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => () => navigate(path)

  return (
    <ContainerDashboardLayout>
      <ContainerSidebar>
        <div>
          <ContainerLogo>
            <img src={ImgLogo} />
          </ContainerLogo>
          <ContainerMenu>
            <ItemMenu onClick={handleNavigate(pathRoutes.USERS.LIST)}>
              <span>
                <User />
              </span>
              <span>Users</span>
            </ItemMenu>
            <ItemMenu onClick={handleNavigate(pathRoutes.ROLES.LIST)}>
              <span>
                <LocalPolice />
              </span>
              <span>Roles</span>
            </ItemMenu>
            <ItemMenu onClick={handleNavigate(pathRoutes.PROJECTS.LIST)}>
              <span>
                <FolderOpen />
              </span>
              <span>Projects</span>
            </ItemMenu>
            <ItemMenu onClick={handleNavigate(pathRoutes.TASKS.LIST)}>
              <span>
                <Task />
              </span>
              <span>Tasks</span>
            </ItemMenu>
            <ItemMenu onClick={handleNavigate(pathRoutes.CALENDAR.LIST)}>
              <span>
                <Calendar />
              </span>
              <span>Calendar</span>
            </ItemMenu>
            <ItemMenu onClick={handleNavigate(pathRoutes.REPORTS.LIST)}>
              <span>
                <BarChartFill />
              </span>
              <span>Reports</span>
            </ItemMenu>
          </ContainerMenu>
          <div>Logout</div>
        </div>
      </ContainerSidebar>
      <ContainerOutlet>
        <div>
          <ContainerBreadcrumb>Breadcrumb</ContainerBreadcrumb>
          <ContainerDataProfile>
            <div>
              <ContainerUser>
                <h4>Alvaro Chico</h4>
                <span>Administrador</span>
              </ContainerUser>
              <ContainerAvatar>
                <div>AC</div>
              </ContainerAvatar>
            </div>
          </ContainerDataProfile>
        </div>
        <div>
          <Outlet />
        </div>
      </ContainerOutlet>
    </ContainerDashboardLayout>
  )
}

export default DashboardLayout
