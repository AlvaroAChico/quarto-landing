import styled from "styled-components"

export const ContainerComponent = styled.div`
  width: fit-content;
  max-width: 600px;
  margin: auto;
`

export const AlertStyles = styled.div`
  flex-direction: column;
  background: #f6f6f6;
  padding: 30px;
  margin: 10px 0;
  display: flex;
  gap: 20px;
  display: grid;
  grid-template-columns: 20px 1fr;

  > img {
    max-width: 20px;
    width: 100%;
  }
`

export const SwitchStyles = styled.div`
  flex-direction: column;
  display: flex;
  margin: 20px 0;
  gap: 20px;
`

export const ItemStyles = styled.div<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 10px;

  > span {
    border: 2px solid green;
    border-radius: 50%;
    background: green;
    display: block;
    padding: 5px;
    height: 10px;
    width: 10px;
  }
`

export const NextStepButton = styled.div`
  border: 1px solid rgb(204, 204, 204);
  background: #f6f6f6;
  border-radius: 40px;
  place-items: center;
  margin-top: 30px;
  padding: 15px;
  display: grid;
  width: 100%;
`

export const FormComponent = styled.div`
  flex-direction: column;
  display: flex;
  gap: 20px;
`

export const FinishButton = styled.button`
  background: linear-gradient(90deg, #52e1c3, #52e1c3);
  color: black;
  border-radius: 20px;
  place-items: center;
  font-size: 0.8rem;
  width: 100%;
  padding: 10px 15px;
  font-weight: 600;
  display: grid;
  border: none;
`

export const ContinueExploreContainer = styled.div`
  grid-template-columns: 1fr 1fr;
  place-items: center;
  display: grid;

  > div {
    flex-direction: column;
    display: flex;
    gap: 10px;

    > img {
      max-width: 400px;
    }
  }
`
export const PersonListWrapper = styled.div`
  flex-direction: column;
  justify-content: center;
  padding: 30px 0;
  display: flex;
  width: 100%;
  color: #000;
  gap: 20px;
`

export const AccordionWrapperPerson = styled.div`
  width: 100%;

  .panel button {
    text-align: left;
    width: 100%;
  }

  .panel__head {
    width: 100%;
    border: none;
    margin-bottom: 8px;
  }
`

export const AccordionTitlePerson = styled.div<{ isValid: boolean }>`
  background: ${p => (p.isValid ? "#00C49A1A" : "#EA02340D")};
  border: 1px solid gray;
  border-radius: 10px;
  list-style: none;
  cursor: pointer;
  outline: none;
  padding: 20px;
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

export const AccordionContentPerson = styled.div`
  padding: 20px 10px;
`

export const ContainerButtonAddPeople = styled.div`
  width: 100%;
  padding: 0 0 30px;

  > button {
    border: 1px solid #e3e3e3;
    justify-content: center;
    border-radius: 15px;
    flex-direction: row;
    align-items: center;
    background: white;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    padding: 20px;
    color: black;
    width: 100%;
    gap: 10px;

    > svg {
      max-width: 20px;
      width: 100%;
    }
  }
`
