import styled from "styled-components"

export const FAQWrapper = styled.section`
  flex-direction: column;
  justify-content: center;
  padding: 40px 60px;
  display: flex;
  width: 100%;
  color: #000;
  gap: 30px;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`

export const FAQTitle = styled.h2`
  background-blend-mode: normal;
  font-size: 42px;
  font-weight: 600;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`

export const AccordionWrapper = styled.div`
  width: 100%;

  .panel button {
    text-align: left;
    width: 100%;
  }

  .panel {
    border-bottom: 1px solid rgb(151, 151, 151);
  }

  .panel__head {
    width: 100%;
    border: none;
    margin-bottom: 6px;
  }
`

export const AccordionTitle = styled.div`
  padding: 20px 0px;
  list-style: none;
  cursor: pointer;
  outline: none;
  border: none;
  width: 100%;

  > li {
    justify-content: space-between;
    font-weight: 600;
    display: flex;

    > svg {
      width: 20px;
    }
  }
`

export const AccordionContent = styled.div`
  border-top: 1px solid rgb(151, 151, 151);
  padding: 20px 10px;
`

export const ShowMoreButton = styled.button`
  background-color: rgb(229, 229, 229);
  border: 1px solid #e1e1e1;
  border-radius: 50px;
  padding: 15px 20px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  max-width: 300px;
  cursor: pointer;
  margin: auto;
  width: 100%;
`
