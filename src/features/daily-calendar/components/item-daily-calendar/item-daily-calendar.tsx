import React from "react"
import { InfoCalendarDTO } from "../../../../core/models/interfaces/calendar-model"
import {
  ActionsItemsDaily,
  BtnApprovedDaily,
  BtnCompletedDaily,
  BtnRejectedDaily,
  EditStyles,
  InfoCardDaily,
  InfoTextDaily,
  ItemCalendarStyles,
} from "./item-daily-calendar.styles"
import { Edit } from "@styled-icons/fluentui-system-filled/Edit"

interface IOwnProps {
  info: InfoCalendarDTO
  onEditItem: () => void
}

const ItemDailyCalendar: React.FC<IOwnProps> = ({ info, onEditItem }) => {
  return (
    <ItemCalendarStyles $service={info.service.name}>
      <InfoCardDaily>
        <div>
          <img src={info.residential.picture} />
        </div>
        <InfoTextDaily>
          <div>
            <span>{info.residential.name}</span>
            <span>{info.status.name}</span>
          </div>
          <div>
            <span>{info.apartment.name}</span>
            {!!info.contractor &&
              !!info.contractor.firstName &&
              !!info.contractor.lastName && (
                <span>
                  {info.contractor.firstName} {info.contractor.lastName}
                </span>
              )}
          </div>
        </InfoTextDaily>
      </InfoCardDaily>
      <ActionsItemsDaily>
        <BtnApprovedDaily>
          {/* <Check /> */}
          <span>Approved</span>
        </BtnApprovedDaily>
        <BtnRejectedDaily>
          {/* <CloseCircle /> */}
          <span>Rejected</span>
        </BtnRejectedDaily>
        <BtnCompletedDaily>
          {/* <Check /> */}
          <span>Completed</span>
        </BtnCompletedDaily>
      </ActionsItemsDaily>
      <EditStyles>
        <Edit onClick={onEditItem} />
      </EditStyles>
    </ItemCalendarStyles>
  )
}

export default ItemDailyCalendar
