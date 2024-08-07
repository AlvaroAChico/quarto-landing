import React, { useState } from 'react';
import {
  ContainerRoles,
  FormGroup,
  Input,
  Label,
  InputIcon,
  PermissionsContainer,
  PermissionRow,
  PermissionItem,
  SectionIcon,
  PermissionName,
} from './create-rol.styles';
import Dropdown from '../../dropdown/Dropdown';
import Switch from '../../../../components/Toggle-container/toggle-container';
import Button from '../../button/button';
import { Title } from './create-rol.styles'; 
// Icons
import { User } from "@styled-icons/boxicons-regular/User"
import { LocalPolice } from "@styled-icons/material/LocalPolice"
import { FolderOpen } from "@styled-icons/fa-regular/FolderOpen"
import { Task } from "@styled-icons/boxicons-regular/Task"
import { Calendar } from "@styled-icons/bootstrap/Calendar"
import { BarChartFill } from "@styled-icons/bootstrap/BarChartFill"
import { Shield } from "@styled-icons/boxicons-regular/Shield";

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
     <Title>Roles</Title> {/* Usando el nuevo componente Title */}
      <FormGroup>
        <Label htmlFor="roleName">Name</Label>
        <InputIcon>
        <LocalPolice size="20"  />
        </InputIcon>
        <Input
          id="roleName"
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
          placeholder='Name'
        />
      </FormGroup>
<FormGroup>
        <Label htmlFor="roleName">List of Permission</Label>
     
        <Dropdown title={<span style={{ display: 'flex', alignItems: 'center' }}><Shield size="20" style={{ color: 'black', marginRight: '0.5rem' }} />Permissions</span>}>
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
      <Button onClick={handleSubmit}>Create</Button>
    </ContainerRoles>
  );
};

export default Roles;

