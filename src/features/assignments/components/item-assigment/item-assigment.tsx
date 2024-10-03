import React from "react"
import { Check2 } from "@styled-icons/bootstrap/Check2"
import { Close } from "@styled-icons/remix-line/Close"
import {
  ActionsAssig,
  InfoAssig,
  ItemAssigmentStyles,
  LoaderStyles,
} from "./item-assigment.styles"
import { AssigmentDTO } from "../../../../core/models/interfaces/assigment-model"
import { formatToDDMonth } from "../../../../utils/date-util"
import { InfoCalendarDTO } from "../../../../core/models/interfaces/calendar-model"
import useDataUser from "../../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../../config/environment/settings"
import { toast } from "sonner"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { FilterPermissionsDTO } from "../../../../core/models/interfaces/user-model"

interface IOwnProps {
  assigment: InfoCalendarDTO
  permissions: FilterPermissionsDTO
  onRefresh: () => void
}

const ItemAssigment: React.FC<IOwnProps> = ({
  assigment,
  permissions,
  onRefresh,
}) => {
  const [isLoadingApproval, setIsLoadingApproval] = React.useState(false)

  const { handleGetToken } = useDataUser()

  const sendResponseAssigment = (accepted: boolean) => {
    const storedToken = handleGetToken()
    if (storedToken) {
      axios
        .post(
          `${settingsApp.api.base}/works/${assigment.id}`,
          {
            type: "contractor",
            status_id: accepted ? 3 : 4,
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
          const data: any = response.data
          onRefresh()
          toast.success("Job updated successfully")
          setIsLoadingApproval(false)
        })
        .catch(err => {
          toast.error(err.response.data.message)
          onRefresh()
          setIsLoadingApproval(false)
        })
    }
  }

  const handleAccepted = () => {
    setIsLoadingApproval(true)
    sendResponseAssigment(true)
  }
  const handleRejected = () => {
    setIsLoadingApproval(true)
    sendResponseAssigment(false)
  }

  return (
    <ItemAssigmentStyles>
      <InfoAssig>
        <div>
          <img src={assigment.residential.picture} />
        </div>
        <div>
          <span>{formatToDDMonth(assigment.startDate)}</span>
          <span>{assigment.status.name}</span>
          <span>
            {assigment.residential.name}, Apartment {assigment.apartment.code}
          </span>
          <span>{assigment.residential.address}</span>
          <span>Notes: {assigment.customerNotes}</span>
        </div>
      </InfoAssig>
      {/* {dataPermissions?..includes("update") && (} */}
      <ActionsAssig>
        <button onClick={handleAccepted} disabled={isLoadingApproval}>
          <Check2 />
        </button>
        <button onClick={handleRejected} disabled={isLoadingApproval}>
          <Close />
        </button>
        {isLoadingApproval && (
          <div>
            <LoaderStyles />
          </div>
        )}
      </ActionsAssig>
    </ItemAssigmentStyles>
  )
}

export default ItemAssigment
