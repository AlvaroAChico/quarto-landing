import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import {
  ContainerProducts,
  ItemProduct,
  ContainerHeadCard,
  ContainerSegurosAccordion,
} from "./info-products.styles"
import { Accordion } from "react-accordion-ts"
import "react-accordion-ts/src/panel.css"

const InfoProducts: React.FC = () => {
  const ProductsAcc = [
    {
      name: "Póliza de Daños al Inmueble",
      description:
        "Protección contra daños que puedan ocurrir durante el periodo de alquiler, con un monto asegurado de hasta un x12 del canon mensual, con la función de sustituir los depósitos en garantía ",
    },
    {
      name: "Póliza de Permanencia (Desalojo)",
      description:
        "Protección contra daños que puedan ocurrir durante el periodo de alquiler, con un monto asegurado de hasta un x12 del canon mensual, con la función de sustituir los depósitos en garantía ",
    },
    {
      name: "Análisis y Verificación de Inquilinos",
      description:
        "Protección contra daños que puedan ocurrir durante el periodo de alquiler, con un monto asegurado de hasta un x12 del canon mensual, con la función de sustituir los depósitos en garantía ",
    },
    {
      name: "Garantía de Pago",
      description:
        "Protección contra daños que puedan ocurrir durante el periodo de alquiler, con un monto asegurado de hasta un x12 del canon mensual, con la función de sustituir los depósitos en garantía ",
    },
    {
      name: "Acceso a Inmovibiaria",
      description:
        "Protección contra daños que puedan ocurrir durante el periodo de alquiler, con un monto asegurado de hasta un x12 del canon mensual, con la función de sustituir los depósitos en garantía ",
    },
  ]

  const items = [{ name: "List Permissions" }].map(({ name }): any => ({
    open,
    title: (
      <div>
        <span>{name}</span>
      </div>
    ),
    content: <>Accordion</>,
  }))

  return (
    <>
      <HeaderSection />
      <ContainerProducts>
        <ItemProduct>
          <ContainerHeadCard>
            <h2>Seguros y Productos Quarto</h2>
            <p>
              Los corredores tendrán la capacidad de ofrecer a sus clientes una
              variedad de productos de seguros para el sector inmobiliario,
              entre ellos:
            </p>
          </ContainerHeadCard>
          <ContainerSegurosAccordion>
            <Accordion items={items} duration={300} multiple={false} />
          </ContainerSegurosAccordion>
        </ItemProduct>
        <ItemProduct>
          <ContainerHeadCard>
            <h2>Venta por Cuotas</h2>
            <p>
              Los corredores tendrán la capacidad de ofrecer a sus clientes una
              variedad de productos de seguros para el sector inmobiliario,
              entre ellos:
            </p>
          </ContainerHeadCard>
          <ContainerSegurosAccordion>
            <Accordion items={items} duration={300} multiple={false} />
          </ContainerSegurosAccordion>
        </ItemProduct>
      </ContainerProducts>
    </>
  )
}

export default InfoProducts
