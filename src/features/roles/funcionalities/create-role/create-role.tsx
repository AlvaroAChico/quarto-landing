import React, { useState } from "react"
import {
  ContainerRoles,
  FormGroup,
  Input,
  Label,
  InputIcon,
  PermissionsContainer,
  ContainerAccordion,
  ContainerTitle,
  ItemPermission,
} from "./create-role.styles"
import Switch from "../../../../components/Toggle-container/toggle-container"
import { Title } from "./create-role.styles"
// Icons
import { User } from "@styled-icons/boxicons-regular/User"
import { LocalPolice } from "@styled-icons/material/LocalPolice"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { Task } from "@styled-icons/boxicons-regular/Task"
import { Calendar } from "@styled-icons/bootstrap/Calendar"
import { BarChartFill } from "@styled-icons/bootstrap/BarChartFill"
// External Librarys
import { Accordion } from "react-accordion-ts"
import "react-accordion-ts/src/panel.css"
import { mockListPermissions } from "../../../../config/mocks/functionalities"
import { APP_MENU } from "../../../../constants/app"
import CustomSwitch from "../../custom-switch/custom-switch"
import HeaderSection from "../../../../components/header-section/header-section"
import Button from "../../../../components/button/button"

const sectionIcons: { [key: string]: React.ReactNode } = {
  users: <User size="20" />,
  roles: <LocalPolice size="20" />,
  projects: <FolderOpen size="20" />,
  tasks: <Task size="20" />,
  calendar: <Calendar size="20" />,
  reports: <BarChartFill size="20" />,
}

const CreateRole: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const handleChangeAccordion = () => setIsOpen(!isOpen)

  const handleSubmit = () => {
    console.log("Role Created")
  }

  const items = [{ name: "List Permissions" }].map(({ name }) => ({
    open,
    title: (
      <ContainerTitle>
        <span>{name}</span>
      </ContainerTitle>
    ),
    content: (
      <PermissionsContainer>
        {(mockListPermissions || []).map(permission => (
          <ItemPermission>
            <span>{APP_MENU[permission.name as keyof typeof APP_MENU]}</span>
            <CustomSwitch
              key={permission.name}
              isActive={false}
              onToggle={function (): void {
                throw new Error("Function not implemented.")
              }}
              label={""}
            />
          </ItemPermission>
        ))}
      </PermissionsContainer>
    ),
  }))

  {
    /* {Object.keys(permissions).map(section => (
    <PermissionRow key={section}>
      <PermissionItem>
        <SectionIcon>{sectionIcons[section]}</SectionIcon>
        <PermissionName>
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </PermissionName>
      </PermissionItem>
      {Object.keys(permissions[section]).map(permission => (
      ))}
    </PermissionRow>
  ))} */
  }

  return (
    <div>
      <HeaderSection title="Roles" subtitle="Create role" />
      <ContainerRoles>
        <FormGroup>
          <Label htmlFor="roleName">Name</Label>
          <InputIcon>
            <LocalPolice size="20" />
          </InputIcon>
          <Input
            id="roleName"
            value={"roleName"}
            onChange={e => {
              console.log("a")
              // setRoleName(e.target.value)
            }}
            placeholder="Name"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="roleName">List of Permission</Label>

          <ContainerAccordion>
            <Accordion items={items} duration={300} multiple={false} />
          </ContainerAccordion>
        </FormGroup>
        <Button text="Create" onClick={handleSubmit} />
      </ContainerRoles>
    </div>
  )
}

export default CreateRole
