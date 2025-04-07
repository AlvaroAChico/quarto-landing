import React, { useState } from "react"
import {
  AccordionContent,
  AccordionTitle,
  AccordionWrapper,
  FAQTitle,
  FAQWrapper,
  ShowMoreButton,
} from "./faq.styles"
import { Accordion } from "react-accordion-ts"
import "react-accordion-ts/src/panel.css"
import { faqData } from "./data"
import { ArrowDown } from "styled-icons/evaicons-solid"

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenItem(openItem === index ? null : index)
  }

  const itemsFaqs = faqData.map(({ answer, question }): any => ({
    open,
    title: (
      <AccordionTitle>
        <li>
          <h3>{question}</h3>
          <ArrowDown />
        </li>
      </AccordionTitle>
    ),
    content: (
      <AccordionContent>
        <span>{answer}</span>
      </AccordionContent>
    ),
  }))

  return (
    <FAQWrapper>
      <FAQTitle>Preguntas Frecuentes sobre alquiler o venta en Quarto</FAQTitle>
      <AccordionWrapper>
        <Accordion items={itemsFaqs} duration={300} multiple={false} />
      </AccordionWrapper>
      {/* <ShowMoreButton>Ver más</ShowMoreButton> */}
    </FAQWrapper>
  )
}

export default FAQ
