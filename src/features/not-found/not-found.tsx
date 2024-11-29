import React from "react"
import { ContainerBg, ContainerNotFound } from "./not-found.styles"
import BgIMG from "../../assets/img/bg_geometry.svg"
import NotFoundIMG from "../../assets/img/not-found.svg"
import Button from "../../components/button/button"
import { pathRoutes } from "../../config/routes/paths"
import { useNavigate } from "react-router-dom"

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <ContainerNotFound>
      <ContainerBg bg={BgIMG}>
        <div>
          <img src={NotFoundIMG} />
          <p>Parece que te has perdido...</p>
          <Button
            onClick={() => navigate(pathRoutes.DASHBOARD.to)}
            text="Volver al Dashboard"
            customStyles={"width: 100%; margin-top: 20px; background: #1AAF99;"}
          />
        </div>
      </ContainerBg>
    </ContainerNotFound>
  )
}

export default NotFound
