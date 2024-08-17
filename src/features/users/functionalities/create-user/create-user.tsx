import React from "react"
import HeaderSection from "../../../../components/header-section/header-section"
import { FormContainer } from "./create-user.styles"

const CreateUser: React.FC = () => {
  return (
    <div>
      <HeaderSection title="Users" subtitle="Create user" />
      <FormContainer>
        <input type="text" placeholder="Enter name"/>
        <input type="text" placeholder="Enter email"/>
        <input type="text" placeholder="Enter password"/>
      </FormContainer>
    </div>
  )
}

export default CreateUser
