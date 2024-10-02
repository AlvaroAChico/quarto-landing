import React from "react"
import { InfoCalendarDTO } from "../../../../core/models/interfaces/calendar-model"
import {
  ActionsItemsDaily,
  BtnApprovedDaily,
  BtnCompletedDaily,
  BtnRejectedDaily,
  InfoCardDaily,
  InfoTextDaily,
  ItemCalendarStyles,
} from "./item-daily-calendar.styles"

interface IOwnProps {
  info: InfoCalendarDTO
}

const ItemDailyCalendar: React.FC<IOwnProps> = ({ info }) => {
  return (
    <ItemCalendarStyles service={info.service.name}>
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
            <span>
              {info.apartment.name}
              {/* <ChangeCircle /> */}
            </span>
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
    </ItemCalendarStyles>
  )
}

export default ItemDailyCalendar
