import styled from "styled-components"

export const ContainerDetailCard = styled.div`
  grid-template-columns: fit-content(100%) 1fr;
  background: #f5f5f5;
  border-radius: 10px;
  line-height: 1.4;
  color: #6b7280;
  font-size: 14px;
  display: grid;
  padding: 20px;
  gap: 10px;

  > img {
    max-width: 20px;
    width: 100%;
  }
`
