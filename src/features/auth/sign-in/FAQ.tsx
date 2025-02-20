import React, { useState } from 'react';
import styled from 'styled-components';

const FAQWrapper = styled.section`
  z-index: 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family: Raleway, sans-serif;
  color: #000;
  justify-content: center;
  padding: 46px 300px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const FAQTitle = styled.h2`
  background-blend-mode: normal;
  font-size: 42px;
  font-weight: 600;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionWrapper = styled.div`
  display: flex;
  margin-top: 32px;
  width: 100%;
  flex-direction: column;
  font-family: DM Sans, sans-serif;
  justify-content: start;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionItem = styled.div`
  border-color: #acacac;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  padding: 24px 16px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionTitle = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  align-self: stretch;
  flex: 1;
  margin-top: 8px;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  display: ${props => props.isOpen ? 'block' : 'none'};

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ShowMoreButton = styled.button`
  align-self: stretch;
  border-radius: 9999px;
  background-color: #f6f6f6;
  min-height: 52px;
  width: 420px;
  max-width: 100%;
  gap: 8px;
  overflow: hidden;
  padding: 18px 8px;
  border: 1px solid #e1e1e1;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  line-height: 1;
  margin-top: 32px;
  cursor: pointer;
`;

const faqData = [
  {
    question: "¿Qué es Quarto?",
    answer: "Quarto es una plataforma innovadora para alquilar y comprar propiedades..."
  },
  {
    question: "¿Qué documentos o requisitos necesito para alquilar con Quarto?",
    answer: "Para alquilar, necesitarás proporcionar: Cédula de identidad, RIF, Movimientos bancarios, Constancia de trabajo, Usuario en redes sociales (Facebook, Instagram, X o LinkedIn). Quarto puede solicitar documentos adicionales si los presentados no son concluyentes o presentan inconsistencias."
  },
  {
    question: "¿Puedo alquilar a nombre de un familiar o amigo?",
    answer: "Sí, es posible alquilar a nombre de un familiar o amigo, pero se requerirán documentos adicionales..."
  },
  {
    question: "¿Qué pagos debo realizar para alquilar un inmueble?",
    answer: "Los pagos típicos incluyen el primer mes de alquiler y posiblemente un depósito de seguridad..."
  },
  {
    question: "¿El precio del alquiler cambiará durante el contrato?",
    answer: "El precio del alquiler generalmente se mantiene fijo durante el período del contrato..."
  },
  {
    question: "¿Cómo se paga la mensualidad en Quarto?",
    answer: "Quarto ofrece varias opciones de pago, incluyendo transferencias bancarias y pagos en línea..."
  },
  {
    question: "¿Cuánto duran los contratos?",
    answer: "La duración de los contratos puede variar, pero típicamente son de 6 meses a 1 año..."
  },
  {
    question: "¿Cuánto tiempo toma alquilar una propiedad?",
    answer: "El tiempo para alquilar una propiedad puede variar, pero generalmente toma entre 1 a 2 semanas..."
  }
];

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <FAQWrapper>
      <FAQTitle>Preguntas Frecuentes</FAQTitle>
      <AccordionWrapper>
        {faqData.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionTitle onClick={() => toggleAccordion(index)}>
              {item.question}
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/efa76f53417b868ed4d70091927c118660752c275b12fb014cffb020dcaba5b5?placeholderIfAbsent=true&apiKey=e9515abc9ca94eaab6a0444e40b2e5f2"
                alt={openItem === index ? "Collapse" : "Expand"}
              />
            </AccordionTitle>
            <AccordionContent isOpen={openItem === index}>
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionWrapper>
      <ShowMoreButton>Ver más</ShowMoreButton>
    </FAQWrapper>
  );
};

export default FAQ;