import { palette } from "../../config/theme/theme"
import styled from "styled-components"

export const UsersContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  :hover {
    background: #e7e7e7;
  }
`

export const ItemUserContainer = styled.div`
  width: 100%;
  border: 1px solid #ebebeb;
  padding: 8px 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const ListPermissionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > div {
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }

    &:nth-child(1) {
      > svg {
        max-width: 20px;
        width: 100%;
        color: ${palette.secondaryColor};
      }
    }
    &:nth-child(2) {
      > svg {
        max-width: 20px;
        width: 100%;
        color: ${palette.primaryColor};
      }
    }
    &:nth-child(3) {
      > svg {
        max-width: 20px;
        width: 100%;
        color: ${palette.errorColor};
      }
    }
  }
`
