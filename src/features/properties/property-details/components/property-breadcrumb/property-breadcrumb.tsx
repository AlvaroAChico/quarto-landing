import styled from "styled-components"

export const PropertyBreadcrumb = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbText>Propiedades</BreadcrumbText>
      <BreadcrumbId>#347</BreadcrumbId>
    </Breadcrumbs>
  )
}

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

const BreadcrumbText = styled.span`
  color: #242424;
`

const BreadcrumbId = styled.span`
  color: #6b7280;
`
