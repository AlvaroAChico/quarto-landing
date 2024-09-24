import React from "react"
import {
  ActionsItems,
  BtnApprovedStyles,
  BtnCompletedStyles,
  BtnRejectedStyles,
  ChangeStyles,
  InfoCardStyles,
  InfoTextStyles,
  ItemGeneralInfo,
} from "./item-calendar-info.styles"
import { InfoCalendarDTO } from "../../../core/models/interfaces/calendar-model"
import { Check } from "@styled-icons/evil/Check"
import { CloseCircle } from "@styled-icons/ionicons-outline/CloseCircle"
import axios from "axios"
import useDataUser from "../../../utils/use-data-user"
import { settingsApp } from "../../../config/environment/settings"
import { UserDTO } from "../../../core/models/interfaces/user-model"
import Select from "react-select"
import { selectStyles } from "../../../config/theme/global-styles"
import { ChangeCircle } from "@styled-icons/material-outlined/ChangeCircle"

interface IOwnProps {
  info: InfoCalendarDTO
}

const ItemCalendarInfo: React.FC<IOwnProps> = ({ info }) => {
  const [isEditingContractor, setIsEditingContractor] =
    React.useState<boolean>(false)
  const [isSubmitContractorUpdate, setIsSubmitContractorUpdate] =
    React.useState<boolean>(false)
  // Contractor
  const [optionsContractors, setOptionsContractor] = React.useState<any>([])
  const [selectedOptionContractor, setSelectedOptionContractor] =
    React.useState<any>(null)

  const { handleGetToken } = useDataUser()

  const fetchDataContractors = () => {
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .get(`${settingsApp.api.base}/users?include=role`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then(response => {
          const listData: UserDTO[] = response.data as UserDTO[]
          const contractors = (listData || []).filter(user =>
            user.role.some(ro => ro.name === "contractor"),
          )
          const listContractors = (contractors || []).map(data => ({
            value: data.id,
            label: data.firstName,
          }))
          setOptionsContractor(listContractors.filter((cont: any) => !!cont))
        })
    }
  }

  React.useEffect(() => {
    fetchDataContractors()
  }, [])

  const handleChangeOptionContractor = (value: any) => {
    setIsSubmitContractorUpdate(true)
    const storedToken = handleGetToken()
    // if (!!storedToken) {
    //   axios
    //     .patch(
    //       `${settingsApp.api.base}/roles/${data.id}`,
    //       {
    //         name: data.name,
    //         permissions: data.permissions,
    //       },
    //       {
    //         headers: {
    //           Authorization: `Bearer ${storedToken}`,
    //           ContentType: "application/json",
    //           Accept: "application/json",
    //         },
    //       },
    //     )
    //     .then(response => {
    //       setIsSubmitContractorUpdate(false)
    //       const data: RoleDTO = response.data as RoleDTO
    //       if (!!data && !!data.id) {
    //         toast.success("Role updated successfully")
    //         handleRefreshData()
    //         handleClose()
    //         navigate(pathRoutes.ROLES.LIST)
    //       }
    //     })
    //     .catch(err => {
    //       setIsSubmitContractorUpdate(false)
    //       toast.error(err.response.data.message)
    //     })
    // }
    setSelectedOptionContractor(value)
  }

  return (
    <ItemGeneralInfo service={info.service.name}>
      <InfoCardStyles>
        <div>
          <img src={info.residential.picture} />
        </div>
        <InfoTextStyles>
          <div>
            <span>{info.residential.name}</span>
            <span>{info.apartment.name}</span>
          </div>
          <div>
            <span>
              {!!info &&
                !!info.contractor &&
                !!info.contractor.firstName &&
                !isEditingContractor &&
                !!info.contractor.lastName && (
                  <ChangeStyles>
                    <span>
                      {`${info.contractor.firstName} ${info.contractor.lastName}`}
                    </span>
                    <span>
                      <ChangeCircle
                        onClick={() => setIsEditingContractor(true)}
                      />
                    </span>
                  </ChangeStyles>
                )}
              {isEditingContractor && (
                <ChangeStyles>
                  <span>
                    <Select
                      defaultValue={selectedOptionContractor}
                      onChange={handleChangeOptionContractor}
                      options={optionsContractors}
                      styles={selectStyles}
                      isSearchable
                    />
                  </span>
                  <span>
                    <ChangeCircle
                      onClick={() => setIsEditingContractor(false)}
                    />
                  </span>
                </ChangeStyles>
              )}
            </span>
            <span>{info.status.name}</span>
          </div>
        </InfoTextStyles>
      </InfoCardStyles>
      <ActionsItems>
        <BtnApprovedStyles>
          <Check />
          <span>Approved</span>
        </BtnApprovedStyles>
        <BtnRejectedStyles>
          <CloseCircle />
          <span>Rejected</span>
        </BtnRejectedStyles>
        <BtnCompletedStyles>
          <Check />
          <span>Completed</span>
        </BtnCompletedStyles>
      </ActionsItems>
    </ItemGeneralInfo>
  )
}

export default ItemCalendarInfo
