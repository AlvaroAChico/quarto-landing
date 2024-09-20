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

interface IOwnProps {
  assigment: InfoCalendarDTO
  onRefresh: () => void
}

const ItemAssigment: React.FC<IOwnProps> = ({ assigment, onRefresh }) => {
  const [isLoadingApproval, setIsLoadingApproval] = React.useState(false)

  const handleAccepted = () => {
    setIsLoadingApproval(true)
    console.log("ID => ", assigment.id)
    // onRefresh()
  }
  const handleRejected = () => {
    onRefresh()
  }

  return (
    <ItemAssigmentStyles>
      <InfoAssig>
        <div>
          <img src={assigment.residential.picture} />
        </div>
        <div>
          <span>{formatToDDMonth(assigment.startDate)}</span>
          <span>{assigment.service.name}</span>
          <span>
            {assigment.residential.name}, Apartment {assigment.apartment.code}
          </span>
          <span>{assigment.residential.address}</span>
          <span>Notes: {assigment.customerNotes}</span>
        </div>
      </InfoAssig>
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
