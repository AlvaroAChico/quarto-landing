import styled from "styled-components"
import { palette } from "../../../../../../config/theme/theme"

export const ContentDetailsOulet = styled.div`
  margin-top: 20px;
`

export const ApartmentTitleStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 22px;
  padding-left: 10px;
  gap: 20px;

  > div img {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 16px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 0;

    span {
      &:nth-child(1) {
        font-size: 24px;
        color: ${palette.primaryColor};
        text-transform: capitalize;
        font-weight: 900;
      }
      &:nth-child(2) {
        color: ${palette.grayColor};
      }
    }
  }
`

export const StatusStylesTD = styled.td<{ status: string }>`
  > div {
    background: ${p =>
      p.status == "active" ? palette.successColor : palette.errorColor};
    color: white;
    text-transform: capitalize;
    text-align: center;
    border-radius: 20px;
    padding: 5px 10px;
    max-width: 100px;

    > span {
      font-size: 12px;
      font-weight: 500;

      &:nth-child(1) {
        font-size: 14px;
      }
    }
  }
`
