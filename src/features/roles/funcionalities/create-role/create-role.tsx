import React from "react"
import {
  ContainerRoles,
  FormGroup,
  Label,
  ContainerAccordion,
  ContainerTitle,
  ContainerListSwitchs,
  ContainerBodySwitch,
} from "./create-role.styles"
// Icons
import { LocalPolice } from "@styled-icons/material/LocalPolice"
// External Librarys
import { Accordion } from "react-accordion-ts"
import "react-accordion-ts/src/panel.css"
import HeaderSection from "../../../../components/header-section/header-section"
import Button from "../../../../components/button/button"
import { settingsApp } from "../../../../config/environment/settings"
import axios from "axios"
import useDataUser from "../../../../utils/use-data-user"
import { toast } from "sonner"
import {
  FilterPermissionsDTO,
  PermissionDTO,
} from "../../../../core/models/interfaces/user-model"
import { PermissionCreateDTO } from "../../../../core/models/interfaces/permission-model"
import Switch from "../../../../components/switch/switch"
import {
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Input from "../../../../components/input/input"
import {
  CreateRoleForm,
  CreateRoleSchema,
} from "../../../../core/models/schemas/role-schema"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../config/routes/path"
import { createEmptyFilterPermissions } from "../../../../utils/cookie-util"
import { APP_MENU } from "../../../../constants/app"

const CreateRole: React.FC = () => {
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verify Token
    const storedToken = handleGetToken()
    if (!storedToken) {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
    // Verify Permissions
    const data = handleGetPermissions()
    if (!!data && !data?.role.includes(APP_MENU.CREATE)) {
      return
    }
  }, [])

  const [listPermissions, setListPermissions] =
    React.useState<PermissionCreateDTO[]>()
  const [isSubmitRoleCreate, setIsSubmitRoleCreate] =
    React.useState<boolean>(false)

  const methods = useForm<CreateRoleForm>({
    resolver: yupResolver(CreateRoleSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    setValue,
  } = methods

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitRoleCreate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .post(
          `${settingsApp.api.base}/roles`,
          {
            name: data.name,
            permissions: data.permissions,
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              ContentType: "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          setIsSubmitRoleCreate(false)
          // const data: CreateUserResponseDTO =
          //   response.data as CreateUserResponseDTO
          const data = response.data
          if (!!data && !!data.message) {
            toast.success(data.message)
            navigate(pathRoutes.ROLES.LIST)
          }
        })
        .catch(err => {
          setIsSubmitRoleCreate(false)
          toast.error("Failed to authenticate")
        })
    }
  }, [])

  React.useEffect(() => {
    const storedToken = handleGetToken()

    if (!!storedToken) {
      axios
        .get(`${settingsApp.api.base}/permissions`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const permissions: PermissionDTO[] = response.data as PermissionDTO[]
          type PermissionKeys = keyof FilterPermissionsDTO

          const listPerm = permissions.reduce<FilterPermissionsDTO>(
            (acc, permission) => {
              const { name } = permission
              const [key, ...actionParts] = name.split("-") as [
                PermissionKeys,
                ...string[],
              ]

              const action = actionParts.join("-")

              if (!acc[key]) {
                acc[key] = []
              }

              acc[key].push(action)

              return acc
            },
            createEmptyFilterPermissions(),
          )
          const objectPerm = transformPermissions(listPerm)
          setListPermissions(objectPerm)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
        })
    }
  }, [])

  const transformPermissions = (
    permissions:
      | FilterPermissionsDTO
      | { [s: string]: unknown }
      | ArrayLike<unknown>,
  ) => {
    const possibleActions = ["create", "list", "read-own", "update", "delete"]

    return Object.entries(permissions).map(([key, actions]) => {
      return {
        name: key,
        values: possibleActions.map(action => ({
          name: action,
          isActive: false,
          enabled: actions.includes(action),
        })),
      }
    })
  }

  const changeStatusPermission = React.useCallback(
    (category: string, permName: string) => {
      if (!listPermissions) {
        console.error("listPermissions is undefined")
        return
      }

      const currentPermissionIndex = listPermissions.findIndex(
        permission => permission.name === category,
      )

      if (currentPermissionIndex !== -1) {
        const currentPermission = listPermissions[currentPermissionIndex]
        const newPermission = { ...currentPermission }

        const value = newPermission.values.find(
          value => value.name === permName,
        )
        if (value) {
          value.isActive = !value.isActive
        }

        const updatedPermissions = [
          ...listPermissions.slice(0, currentPermissionIndex),
          newPermission,
          ...listPermissions.slice(currentPermissionIndex + 1),
        ]

        setListPermissions(updatedPermissions)
      }
    },
    [listPermissions],
  )

  React.useEffect(() => {
    if (!!listPermissions) {
      const arrayPermissions: string[] = (listPermissions || []).flatMap(item =>
        item.values
          .filter(value => value.isActive)
          .map(value => `${item.name}-${value.name}`),
      )
      setValue("permissions", arrayPermissions)
    }
  }, [listPermissions])

  const items = [{ name: "List Permissions" }].map(({ name }): any => ({
    open,
    title: (
      <ContainerTitle>
        <span>{name}</span>
      </ContainerTitle>
    ),
    content: (
      <>
        {(listPermissions || []).map(permission => (
          <ContainerBodySwitch>
            <span>{permission.name}</span>
            <ContainerListSwitchs>
              {(permission.values || []).map(value => (
                <Switch
                  isActive={value.isActive}
                  isEnabled={value.enabled}
                  onToggle={() =>
                    changeStatusPermission(permission.name, value.name)
                  }
                  label={value.name}
                />
              ))}
            </ContainerListSwitchs>
          </ContainerBodySwitch>
        ))}
      </>
    ),
  }))

  return (
    <div>
      <HeaderSection title="Roles" subtitle="Create role" />
      <ContainerRoles>
        <WrapperInput>
          <label htmlFor="name-create-role">First Name</label>
          <Input
            id="name-create-role"
            placeholder="Enter name"
            icon={LocalPolice}
            register={register("name")}
          />
          {!!(errors.name as any)?.message && (
            <ErrorMessage>{(errors.name as any)?.message}</ErrorMessage>
          )}
        </WrapperInput>

        <FormGroup>
          <Label htmlFor="roleName">List of Permission</Label>
          <ContainerAccordion>
            <Accordion items={items} duration={300} multiple={false} />
          </ContainerAccordion>
        </FormGroup>
        <Button
          text="Create"
          onClick={submitWrapper(handleSubmit)}
          isLoading={isSubmitRoleCreate}
        />
      </ContainerRoles>
    </div>
  )
}

export default CreateRole
