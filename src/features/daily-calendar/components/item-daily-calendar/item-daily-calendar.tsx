import React from "react"
import { InfoCalendarDTO } from "../../../../core/models/interfaces/calendar-model"
import {
  ActionsItemsDaily,
  BtnApprovedDaily,
  BtnCompletedDaily,
  BtnRejectedDaily,
  ContainerFilesView,
  DeleteStyles,
  EditStyles,
  InfoCardDaily,
  InfoTextDaily,
  ItemCalendarStyles,
  JobStatusStyle,
} from "./item-daily-calendar.styles"
import { Edit } from "@styled-icons/fluentui-system-filled/Edit"
import { FilterPermissionsDTO } from "../../../../core/models/interfaces/user-model"
import { APP_MENU } from "../../../../constants/app"
import useDataUser from "../../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../../config/environment/settings"
import { setErrResponse } from "../../../../utils/erros-util"
import { MessageResponsedDTO } from "../../../../core/models/interfaces/general-model"
import { toast } from "sonner"
import ModalNoteCalendar from "../../../../components/modal/variants/modal-note-calendar/modal-note-calendar"
import { LoaderStyles } from "../../../../components/button/button.styles"
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle"
import { CloseCircle } from "@styled-icons/ionicons-outline/CloseCircle"
import { Files } from "@styled-icons/simple-icons/Files"
import { Close } from "styled-icons/evaicons-solid"
import { Reviews } from "styled-icons/material-twotone"

interface IOwnProps {
  info: InfoCalendarDTO
  dataPermissions: FilterPermissionsDTO
  onEditItem: () => void
  onDeleteWork: () => void
  onRefreshData: () => void
}

const ItemDailyCalendar: React.FC<IOwnProps> = ({
  info,
  dataPermissions,
  onEditItem,
  onDeleteWork,
  onRefreshData,
}) => {
  const [isOpenModal, setIsOpenModal] = React.useState<boolean>(false)
  const [statusReview, setStatusReview] = React.useState<number>(0)
  const [isWorkReview, setIsWorkReview] = React.useState<boolean>(false)

  const handleCloseModal = () => setIsOpenModal(false)

  const { handleGetToken } = useDataUser()

  const handleWorkReview = React.useCallback(
    (type: string, status: number, notes: string = "") => {
      setIsWorkReview(true)
      const storedToken = handleGetToken()
      if (!!storedToken) {
        const reviewData: any = {
          type,
          status_id: status,
        }

        if (!!notes && notes != "") {
          reviewData.notes = notes
        }

        axios
          .post(`${settingsApp.api.base}/works/${info.id}/review`, reviewData, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              ContentType: "application/json",
              Accept: "application/json",
            },
          })
          .then(response => {
            setIsWorkReview(false)
            const data: any = response.data
            if (!!data) {
              toast.success("Job updated successfully")
              onRefreshData()
            }
          })
          .catch(err => {
            setIsWorkReview(false)
            setErrResponse(err)
          })
      }
    },
    [statusReview],
  )

  const handleSendReview = (type: string, status: number) => () => {
    if (type === "quality" && (status === 7 || status === 4)) {
      setStatusReview(status)
      setIsOpenModal(true)
    } else {
      handleWorkReview(type, status)
    }
  }

  const handleViewFiles = () => {
    if (!!info && !!info.images && info.images.length > 0) {
      toast.info(
        <ContainerFilesView>
          <h3>This works has {info.images.length} files</h3>
          <ol>
            {info.images.map((dataImg, index) => (
              <li>
                <span>
                  File {index + 1} - {dataImg.fileLocation.split(".")[1]} :
                  <a key={index} href={dataImg.file}>
                    Download
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </ContainerFilesView>,
        {
          position: "bottom-right",
        },
      )
    }
  }

  return (
    <>
      <ItemCalendarStyles $service={info.service.name}>
        <InfoCardDaily>
          <div>
            <img src={info.residential.picture} />
          </div>
          <InfoTextDaily>
            <div>
              <span>{info.residential.name}</span>
              <span>{info.status.name}</span>
              {!!info && !!info.images && info.images.length > 0 && (
                <span onClick={handleViewFiles}>
                  <Files />
                </span>
              )}
            </div>
            <div>
              <span>{info.apartment.name}</span>
              {!!info.contractor &&
                !!info.contractor.firstName &&
                !!info.contractor.lastName && (
                  <span>
                    Contractor: {info.contractor.firstName}{" "}
                    {info.contractor.lastName}
                  </span>
                )}
              {!!info && !!info.customerNotes && (
                <span>Notes: {info.customerNotes}</span>
              )}
              {!!info && !!info.residential && !!info.residential.address && (
                <span>Address: {info.residential.address}</span>
              )}
            </div>
          </InfoTextDaily>
        </InfoCardDaily>
        <ActionsItemsDaily>
          {!isWorkReview &&
            dataPermissions?.quality.includes(APP_MENU.UPDATE) &&
            info.statusId == 8 && (
              <>
                <BtnApprovedDaily onClick={handleSendReview("quality", 7)}>
                  <span>Approved</span>
                </BtnApprovedDaily>
                <BtnRejectedDaily onClick={handleSendReview("quality", 4)}>
                  <span>Rejected</span>
                </BtnRejectedDaily>
              </>
            )}
          {dataPermissions?.contractor.includes(APP_MENU.UPDATE) && (
            <>
              {!isWorkReview && info.statusId == 3 && (
                <BtnCompletedDaily onClick={handleSendReview("contractor", 9)}>
                  <span>In progress</span>
                </BtnCompletedDaily>
              )}
              {!isWorkReview && info.statusId == 9 && (
                <BtnCompletedDaily onClick={handleSendReview("contractor", 8)}>
                  <span>Completed</span>
                </BtnCompletedDaily>
              )}
            </>
          )}
          {!isWorkReview && info.qualityStatusId == 7 && (
            <JobStatusStyle status={info.qualityStatusId}>
              <CheckCircle />
            </JobStatusStyle>
          )}
          {!isWorkReview && info.qualityStatusId == 4 && (
            <JobStatusStyle status={info.qualityStatusId}>
              <CloseCircle />
            </JobStatusStyle>
          )}
          {isWorkReview && <LoaderStyles />}
        </ActionsItemsDaily>
        {dataPermissions?.work.includes(APP_MENU.UPDATE) && (
          <EditStyles onClick={onEditItem}>
            <Edit />
          </EditStyles>
        )}
        {dataPermissions?.work.includes(APP_MENU.UPDATE) && (
          <DeleteStyles onClick={onDeleteWork}>
            <Close />
          </DeleteStyles>
        )}
      </ItemCalendarStyles>
      <ModalNoteCalendar
        isOpen={isOpenModal}
        dataEdit={info}
        isLoadingReview={isWorkReview}
        statusReview={statusReview}
        handleClose={handleCloseModal}
        handleWorkReview={handleWorkReview}
      />
    </>
  )
}

export default ItemDailyCalendar
