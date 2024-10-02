import React from "react"
import Modal from "../../modal"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  FilterPermissionsDTO,
  MeDTO,
  PermissionDTO,
  RoleDTO,
} from "../../../../core/models/interfaces/user-model"
import {
  ContainerAccordion,
  ContainerBodySwitch,
  ContainerListSwitchs,
  ContainerTitle,
  customStylesEdit,
  FormContainer,
  FormGroupStyles,
  LabelStyles,
} from "./modal-edit-role.styles"
import {
  ErrorMessage,
  WrapperInput,
} from "../../../../config/theme/global-styles"
import Button from "../../../button/button"
import Input from "../../../input/input"
import axios from "axios"
import { toast } from "sonner"
import useDataUser from "../../../../utils/use-data-user"
import { settingsApp } from "../../../../config/environment/settings"
import { LocalPolice } from "@styled-icons/material/LocalPolice"
import {
  UpdateRoleForm,
  UpdateRoleSchema,
} from "../../../../core/models/schemas/role-schema"
import { Accordion } from "react-accordion-ts"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../../config/routes/path"
import Switch from "../../../switch/switch"
import { PermissionCreateDTO } from "../../../../core/models/interfaces/permission-model"
import {
  createEmptyFilterPermissions,
  saveJsonCookiesWithSplit,
} from "../../../../utils/cookie-util"
import { COOKIES_APP } from "../../../../constants/app"
import Cookies from "js-cookie"

interface IOwnProps {
  isOpen: boolean
  dataRoleEdit: RoleDTO
  handleClose: () => void
  handleRefreshData: () => void
}

const ModalEditRole: React.FC<IOwnProps> = ({
  isOpen,
  dataRoleEdit,
  handleClose,
  handleRefreshData,
}) => {
  const [isSubmitRoleUpdate, setIsSubmitRoleUpdate] =
    React.useState<boolean>(false)
  const [listPermissions, setListPermissions] =
    React.useState<PermissionCreateDTO[]>()
  const navigate = useNavigate()

  const { handleGetToken, clearAllDataAPP } = useDataUser()
  const methods = useForm<UpdateRoleForm>({
    resolver: yupResolver(UpdateRoleSchema),
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

  React.useEffect(() => {
    if (!!dataRoleEdit) {
      setValue("id", `${dataRoleEdit.id}`)
      setValue("name", dataRoleEdit.name)
      const currentPermissions = dataRoleEdit.permissions.map(
        permission => permission.name,
      )
      setValue("permissions", currentPermissions)
      updateCurrentPermissions(currentPermissions)
    }
  }, [dataRoleEdit])

  const updateCurrentPermissions = React.useCallback(
    (permissions: string[]) => {
      if (!!permissions) {
        permissions.map(perm => {
          const [permissionName, valueName] = perm.split("-")
          changeStatusPermission(permissionName, valueName)
        })
      }
    },
    [dataRoleEdit],
  )

  const updateDataRolePermissions = async () => {
    const storedToken = handleGetToken()

    if (!!storedToken) {
      const response = await axios
        .get(`${settingsApp.api.base}/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            ContentType: "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const meData: MeDTO = response.data as MeDTO
          if (!!meData && !!meData.id) {
            const expiration = {
              expires: 7,
            }
            const { roles, permisos, ...meUser } = meData
            Cookies.set(
              COOKIES_APP.USER_RES,
              JSON.stringify(meUser),
              expiration,
            )
            Cookies.set(
              COOKIES_APP.ROLES_APP,
              JSON.stringify(roles),
              expiration,
            )
            // Filter data permissions
            const result: FilterPermissionsDTO = createEmptyFilterPermissions()

            permisos
              .map(permission => permission.name)
              .forEach(permission => {
                const parts = permission.split("-")
                const type = parts[0]

                if (type in result) {
                  const action = parts.slice(1).join("-")
                  result[type as keyof FilterPermissionsDTO].push(action)
                }
              })

            if (!!result) {
              saveJsonCookiesWithSplit(result)
            }
          }
          window.location.reload()
        })
    } else {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
  }

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitRoleUpdate(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .patch(
          `${settingsApp.api.base}/roles/${data.id}`,
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
          setIsSubmitRoleUpdate(false)
          const data: RoleDTO = response.data as RoleDTO
          if (!!data && !!data.id) {
            toast.success("Role updated successfully")
            handleRefreshData()
            handleClose()
            // navigate(pathRoutes.ROLES.LIST)
            updateDataRolePermissions()
          }
        })
        .catch(err => {
          setIsSubmitRoleUpdate(false)
          toast.error(err.response.data.message)
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

  const items = [{ name: "List Permissions" }].map(({ name }) => ({
    open: false,
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
                  key={value.name}
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
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setListPermissions([])
        handleClose()
      }}
      title="Edit Role"
      customStyles={customStylesEdit}
    >
      <FormContainer>
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

        <FormGroupStyles>
          <LabelStyles htmlFor="roleName">List of Permission</LabelStyles>
          <ContainerAccordion>
            <Accordion items={items} duration={300} multiple={false} />
          </ContainerAccordion>
        </FormGroupStyles>
        <Button
          onClick={submitWrapper(handleSubmit)}
          text="Update Role"
          isLoading={isSubmitRoleUpdate}
        />
      </FormContainer>
    </Modal>
  )
}

export default ModalEditRole
