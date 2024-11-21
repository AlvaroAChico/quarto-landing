import React from "react"
import { useParams } from "react-router-dom"
import {
  ContainerDetail,
  ContainerInfoRental,
  ContainerInfoVisit,
  ItemInfoRental,
} from "./detail-visits.styles"
import { Edit } from "@styled-icons/boxicons-solid/Edit"
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline"
import { Whatsapp } from "@styled-icons/boxicons-logos/Whatsapp"
import { Phone } from "@styled-icons/material-outlined/Phone"
import { setErrResponse } from "../../../../utils/erros-util"
import useDataUser from "../../../../utils/use-data-user"
import axios from "axios"
import { VisitDetailDTO } from "../../../../core/models/interfaces/visits-model"
import { settingsApp } from "../../../../config/environment/settings"

const DetailVisits: React.FC = () => {
  const [dataFetch, setDataFetch] = React.useState<VisitDetailDTO>()
  const { id } = useParams()
  const { handleGetToken } = useDataUser()

  const fetchData = async (url: string) => {
    const storedToken = handleGetToken()
    if (!storedToken) {
      throw new Error("No token found")
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      return response.data
    } catch (err) {
      setErrResponse(err)
      throw err
    }
  }

  const fetchDataDetail = async () => {
    try {
      const data: VisitDetailDTO = await fetchData(
        `${settingsApp.api.base}/visits/${id}`,
      )
      setDataFetch(data)
    } catch (err) {
      setErrResponse(err)
    }
  }

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([fetchDataDetail()])
    }

    fetchDataAsync()
  }, [])

  const handleSendWhatsApp = (phone: string) => () => {
    window.open(`https://wa.me/${phone}`, "_blank")
  }

  const handleCallPhone = (phone: string) => () => {
    window.open(`tel:${phone}`, "_blank")
  }

  return (
    <ContainerDetail>
      <ContainerInfoVisit>
        <div>
          <h2>{dataFetch?.name_rental}</h2>
          <span>
            <Edit />
            <CloseOutline />
          </span>
        </div>
        <div>
          <p>
            <span>ID {dataFetch?.id}</span>
            <span>{dataFetch?.status}</span>
          </p>
          <p>
            <span>Fecha de la visita</span>
            <strong>{dataFetch?.date_visit}</strong>
          </p>
          <p>
            <span>Hora de la visita</span>
            <strong>{dataFetch?.time_visit}</strong>
          </p>
          <p>
            <span>Nota</span>
            <span>
              <strong>{dataFetch?.note}</strong>
            </span>
          </p>
        </div>
      </ContainerInfoVisit>
      <ContainerInfoRental>
        <ItemInfoRental>
          <div>
            <span>Nombre</span>
            <span>{dataFetch?.agent.name}</span>
          </div>
          <div>
            <span>ID PA</span>
            <span>{dataFetch?.agent.id_pa}</span>
          </div>
        </ItemInfoRental>
        <ItemInfoRental>
          <div>
            <div>
              <span>Inquilino</span>
              <span>{dataFetch?.tenant.name}</span>
            </div>
            <div>
              <Whatsapp
                onClick={handleSendWhatsApp(
                  dataFetch?.tenant?.contact?.whatsapp || "",
                )}
              />
              <Phone
                onClick={handleCallPhone(
                  dataFetch?.tenant?.contact?.whatsapp || "",
                )}
              />
            </div>
          </div>
          <div>
            <span>Perfil Inquilino</span>
            <span>{dataFetch?.tenant.profile}</span>
          </div>
        </ItemInfoRental>
        <ItemInfoRental>
          <div>
            <div>
              <span>Propietario</span>
              <span>{dataFetch?.owner.name}</span>
            </div>
            <div>
              <Whatsapp
                onClick={handleSendWhatsApp(
                  dataFetch?.owner?.contact?.whatsapp || "",
                )}
              />
              <Phone
                onClick={handleCallPhone(
                  dataFetch?.owner?.contact?.whatsapp || "",
                )}
              />
            </div>
          </div>
          <div>
            <span>Características del inmueble</span>
            <span>{dataFetch?.owner.property_features}</span>
          </div>
        </ItemInfoRental>
      </ContainerInfoRental>
    </ContainerDetail>
  )
}

export default DetailVisits
