import React from "react"
import { LockAlt } from "@styled-icons/boxicons-solid/LockAlt"
import {
  ContainerForbiddenAction,
  LogoForbidden,
  TextForbidden,
} from "./forbidden-action.styles"

const ForbiddenAction: React.FC = () => {
  return (
    <ContainerForbiddenAction>
      <LogoForbidden>
        <LockAlt />
      </LogoForbidden>
      <TextForbidden>
        You don't have permissions for this section. Please contact your
        administrator.
      </TextForbidden>
    </ContainerForbiddenAction>
  )
}

export default ForbiddenAction
