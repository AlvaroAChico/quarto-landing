import styled from "styled-components"

export const PublishWrapper = styled.section`
  border-radius: 24px;
  overflow: hidden;
  height: 360px;
  width: 100%;
  background: #4568df;

  //   background-color: #fff;
  //   z-index: 0;
  //   display: flex;
  //   width: 100%;
  //   flex-direction: column;
  //   color: #010101;
  //   font-weight: 700;
  //   justify-content: center;
`

export const PublishContainer = styled.div`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
  border-radius: 24px;
  display: grid;
  height: 360px;
  width: 100%;
`

export const PublishImage = styled.img`
  object-position: center;
  object-fit: cover;
  height: 100%;
  width: 100%;
`

export const PublishContent = styled.div`
  justify-content: space-between;
  background-color: #4568df;
  flex-direction: column;
  display: flex;
  padding: 30px;
  color: white;
`

export const PublishTitle = styled.h2`
  font-size: 1.8rem;
`

export const PublishCTA = styled.div`
  justify-content: flex-end;
  align-items: center;
  font-weight: 600;
  display: flex;
  width: 100%;
  gap: 20px;
`

export const CTAText = styled.span`
  align-self: stretch;
  margin: auto 0;
`

export const CTAButton = styled.button`
  background-color: #fff;
  align-self: stretch;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  height: 50px;
  border: none;
  width: 50px;

  > svg {
    color: #4568df;
    max-width: 25px;
    width: 100%;
  }
`
