import React from "react"
import {
  ContainerPermissions,
  ItemPermission,
  ItemSidebar,
  ListPermissions,
  MainPermission,
  TitlePermissions,
  ToggleCircle,
  ToggleContainer,
} from "./permissions.styles"
import { Outlet, useParams } from "react-router-dom"
import { mockUsersPermissions } from "../../../config/mocks/users"
import { Permission, User } from "../../../core/models/user-model"
import { APP_MENU, APP_PERMISSIONS } from "../../../constants/app"

const Permissions: React.FC = () => {
  const [userData, setUserData] = React.useState<User>()
  const { id } = useParams()

  const handleChangePermissions = React.useCallback(
    (appMenu: string, appPermission: string) => {
      const newPermissions: Permission[] = userData!.permissions.map(per => {
        const newPer = { ...per }
        if (newPer.name === appMenu) {
          if (newPer.permissions.includes(appPermission)) {
            newPer.permissions = newPer.permissions.filter(
              permission => permission !== appPermission,
            )
          } else {
            newPer.permissions.push(appPermission)
          }
        }

        return newPer
      })
      const newData = { ...userData!, permissions: newPermissions }
      setUserData(newData)
    },
    [userData],
  )

  React.useEffect(() => {
    const data = mockUsersPermissions.filter(user => user.id == id)[0]
    if (!!data) {
      setUserData(data)
    }
  }, [id])

  return (
    <ContainerPermissions>
      <h2>Permisos</h2>
      <div>
        <ItemSidebar>
          <TitlePermissions>
            <span>Ver</span>
            <span>Crear</span>
            <span>Editar</span>
            <span>Eliminar</span>
          </TitlePermissions>
          {(userData?.permissions || []).map(permission => (
            <MainPermission>
              <div>{APP_MENU[permission.name as keyof typeof APP_MENU]}</div>
              <ListPermissions>
                <ItemPermission>
                  {/* <span>Ver</span> */}
                  <ToggleContainer
                    isActive={permission.permissions.includes(
                      APP_PERMISSIONS.LIST,
                    )}
                    onClick={() =>
                      handleChangePermissions(
                        permission.name,
                        APP_PERMISSIONS.LIST,
                      )
                    }
                  >
                    <ToggleCircle
                      isActive={permission.permissions.includes(
                        APP_PERMISSIONS.LIST,
                      )}
                    ></ToggleCircle>
                  </ToggleContainer>
                </ItemPermission>
                <ItemPermission>
                  {/* <span>Crear</span> */}
                  <ToggleContainer
                    isActive={permission.permissions.includes(
                      APP_PERMISSIONS.CREATE,
                    )}
                    onClick={() =>
                      handleChangePermissions(
                        permission.name,
                        APP_PERMISSIONS.CREATE,
                      )
                    }
                  >
                    <ToggleCircle
                      isActive={permission.permissions.includes(
                        APP_PERMISSIONS.CREATE,
                      )}
                    ></ToggleCircle>
                  </ToggleContainer>
                </ItemPermission>
                <ItemPermission>
                  {/* <span>Editar</span> */}
                  <ToggleContainer
                    isActive={permission.permissions.includes(
                      APP_PERMISSIONS.UPDATE,
                    )}
                    onClick={() =>
                      handleChangePermissions(
                        permission.name,
                        APP_PERMISSIONS.UPDATE,
                      )
                    }
                  >
                    <ToggleCircle
                      isActive={permission.permissions.includes(
                        APP_PERMISSIONS.UPDATE,
                      )}
                    ></ToggleCircle>
                  </ToggleContainer>
                </ItemPermission>
                <ItemPermission>
                  {/* <span>Eliminar</span> */}
                  <ToggleContainer
                    isActive={permission.permissions.includes(
                      APP_PERMISSIONS.DELETE,
                    )}
                    onClick={() =>
                      handleChangePermissions(
                        permission.name,
                        APP_PERMISSIONS.DELETE,
                      )
                    }
                  >
                    <ToggleCircle
                      isActive={permission.permissions.includes(
                        APP_PERMISSIONS.DELETE,
                      )}
                    ></ToggleCircle>
                  </ToggleContainer>
                </ItemPermission>
              </ListPermissions>
            </MainPermission>
          ))}
        </ItemSidebar>
      </div>
      <div>
        <Outlet />
      </div>
    </ContainerPermissions>
  )
}

export default Permissions
