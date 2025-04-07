import styled from "styled-components"
import ForwardIconIMG from "../../../../../assets/img/icons/icon_forward_detailproperty.png"
import VerifyIconIMG from "../../../../../assets/img/icons/icon_verified_detail.png"
import { FC } from "react"
import { NavLink } from "react-router-dom"
import { pathRoutes } from "../../../../../config/routes/paths"

export const PropertyBreadcrumb: FC = () => {
  return (
    <HeadInfoBreadcrumb>
      <Breadcrumbs>
        <BreadcrumbText to={pathRoutes.HOME.to}>
          Inicio <img src={ForwardIconIMG} />
        </BreadcrumbText>
        <BreadcrumbText to={pathRoutes.PROPERTY.to}>
          Propiedades <img src={ForwardIconIMG} />
        </BreadcrumbText>
        <BreadcrumbId>#347</BreadcrumbId>
      </Breadcrumbs>
      <VerifyPropertyByQuarto>
        <img src={VerifyIconIMG} />
        Propiedad verificada por Quarto
      </VerifyPropertyByQuarto>
    </HeadInfoBreadcrumb>
  )
}

const VerifyPropertyByQuarto = styled.div`
  align-items: center;
  font-weight: 700;
  display: flex;
  gap: 5px;
`

const HeadInfoBreadcrumb = styled.div`
  grid-template-columns: 1fr fit-content(100%);
  display: grid;
`

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 16px;
  color: #242424;
  font-weight: 500;
  margin-bottom: 14px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`

const BreadcrumbText = styled(NavLink)`
  justify-content: center;
  text-decoration: none;
  align-items: center;
  color: #242424;
  display: flex;
  gap: 6px;

  > img {
    max-width: 6px;
    width: 100%;
  }
`

const BreadcrumbId = styled.span`
  color: #6b7280;
`
