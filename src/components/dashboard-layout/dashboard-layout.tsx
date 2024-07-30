import React from "react"
import { Outlet, useNavigate } from "react-router-dom"
import {
  ContainerDashboardLayout,
  ContainerLogo,
  ContainerMenu,
  ContainerOutlet,
  ContainerSidebar,
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

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => () => navigate(path)

  return (
    <ContainerDashboardLayout>
      <ContainerSidebar>
        <ContainerLogo>
          <img src={ImgLogo} />
        </ContainerLogo>
        <ContainerMenu>
          <ItemMenu onClick={handleNavigate("usuarios")}>
            <span>
              <User />
            </span>
            <span>Usuarios</span>
          </ItemMenu>
          <ItemMenu onClick={handleNavigate("roles")}>
            <span>
              <LocalPolice />
            </span>
            <span>Roles</span>
          </ItemMenu>
          <ItemMenu onClick={handleNavigate("proyectos")}>
            <span>
              <FolderOpen />
            </span>
            <span>Proyectos</span>
          </ItemMenu>
          <ItemMenu onClick={handleNavigate("tareas")}>
            <span>
              <Task />
            </span>
            <span>Tareas</span>
          </ItemMenu>
          <ItemMenu onClick={handleNavigate("calendario")}>
            <span>
              <Calendar />
            </span>
            <span>Calendario</span>
          </ItemMenu>
          <ItemMenu onClick={handleNavigate("reportes")}>
            <span>
              <BarChartFill />
            </span>
            <span>Reportes</span>
          </ItemMenu>
        </ContainerMenu>
        <div>Cerrar sesión</div>
      </ContainerSidebar>
      <ContainerOutlet>
        <div>Navbar</div>
        <div>
          <Outlet />
        </div>
      </ContainerOutlet>
    </ContainerDashboardLayout>
  )
}

export default DashboardLayout
