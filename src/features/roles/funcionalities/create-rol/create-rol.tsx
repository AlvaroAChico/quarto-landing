import React, { useState } from 'react';
import {
  ContainerRoles,
  FormGroup,
  Input,
  Label,
  InputIcon,
  PermissionsContainer,
  PermissionRow,
  CreateButton,
  IconContainer,
  PermissionItem,
  SectionIcon,
  PermissionName,
} from './create-rol.styles';
import Dropdown from '../../switch/Dropdown';
import Switch from '../../switch/Switch';
// Icons
import { User } from "@styled-icons/boxicons-regular/User"
import { LocalPolice } from "@styled-icons/material/LocalPolice"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { Task } from "@styled-icons/boxicons-regular/Task"
import { Calendar } from "@styled-icons/bootstrap/Calendar"
import { BarChartFill } from "@styled-icons/bootstrap/BarChartFill"
import { AccountCircle } from "@styled-icons/material/AccountCircle"

const sectionIcons: { [key: string]: React.ReactNode } = {
  users: <User size="20" />,
  roles: <LocalPolice size="20" />,
  projects: <FolderOpen size="20" />,
  tasks: <Task size="20" />,
  calendar: <Calendar size="20" />,
  reports: <BarChartFill size="20" />,
};

const Roles: React.FC = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    users: { view: false, create: false, update: false, delete: false },
    roles: { view: false, create: false, update: false, delete: false },
    projects: { view: false, create: false, update: false, delete: false },
    tasks: { view: false, create: false, update: false, delete: false },
    calendar: { view: false, create: false, update: false, delete: false },
    reports: { view: false, create: false, update: false, delete: false },
  });

  const handlePermissionChange = (section: string, permission: string) => {
    setPermissions(prev => ({
      ...prev,
      [section]: { ...prev[section], [permission]: !prev[section][permission] }
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Role Created:', roleName, permissions);
  };

  return (
    <ContainerRoles>
      <FormGroup>
        <Label htmlFor="roleName">Name</Label>
        <InputIcon>
          <AccountCircle size="24" />
        </InputIcon>
        <Input
          id="roleName"
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Dropdown title="List of permissions">
          <PermissionsContainer>
            {Object.keys(permissions).map(section => (
              <PermissionRow key={section}>
                <PermissionItem>
                  <SectionIcon>
                    {sectionIcons[section]}
                  </SectionIcon>
                  <PermissionName>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </PermissionName>
                </PermissionItem>
                {Object.keys(permissions[section]).map(permission => (
                  <Switch
                    key={permission}
                    isActive={permissions[section][permission]}
                    onToggle={() => handlePermissionChange(section, permission)}
                    label={permission.charAt(0).toUpperCase() + permission.slice(1)}
                  />
                ))}
              </PermissionRow>
            ))}
          </PermissionsContainer>
        </Dropdown>
      </FormGroup>
      <CreateButton onClick={handleSubmit}>Create</CreateButton>
    </ContainerRoles>
  );
};

export default Roles;

