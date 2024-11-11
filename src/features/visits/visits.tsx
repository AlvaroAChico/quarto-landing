import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import {
  ContainerFilters,
  ContainerImageVisit,
  ContainerListVisits,
  ContainerReset,
  ContainerText,
  ContainerVisits,
  ContentStylesSection,
  ItemFilterStyle,
} from "./visits.styles"
import Table from "../../components/table/table"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import useDataUser from "../../utils/use-data-user"
import { useNavigate } from "react-router-dom"
import { VisitDTO } from "../../core/models/interfaces/visits-model"
import { setErrResponse } from "../../utils/erros-util"
import { StatusCell } from "../../components/table/table.styles"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { selectFilterStyles } from "../../config/theme/global-styles"
import { Filter2 } from "@styled-icons/remix-line/Filter2"
import { Replay } from "@styled-icons/material/Replay"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"

const Visits: React.FC = () => {
  const [listVisits, setListVisits] = React.useState<VisitDTO[]>([])
  // Filter ID
  const [optionsId, setOptionsId] = React.useState<any>([])
  const [selectedOptionId, setSelectedOptionId] = React.useState<any>(null)
  const handleChangeOptionId = (value: any) => {
    setSelectedOptionId(value)
    const listIds = listVisits.filter(prop => prop.id == value.value)
  }
  // Filter Category
  const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  const [selectedOptionCategory, setSelectedOptionCategory] =
    React.useState<any>(null)
  const handleChangeOptionCategory = (value: any) => {
    setSelectedOptionCategory(value)
    const listIds = listVisits.filter(prop => prop.id == value.value)
  }
  // Filter Status
  const [optionsStatus, setOptionsStatus] = React.useState<any>([])
  const [selectedOptionStatus, setSelectedOptionStatus] =
    React.useState<any>(null)
  const handleChangeOptionStatus = (value: any) => {
    setSelectedOptionStatus(value)
    const listIds = listVisits.filter(prop => prop.id == value.value)
  }
  const [daySelected, setDaySelected] = React.useState<any>(null)

  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  const [isLoadingListVisits, setIsLoadingListVisits] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(() => {
    const storedToken = handleGetToken()
    if (storedToken) {
      setIsLoadingListVisits(true)
      axios
        .get(`${settingsApp.api.base}/visits`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const dataResponse: VisitDTO[] = response.data as VisitDTO[]
          if (!!dataResponse) {
            setListVisits(dataResponse)
          }
          setIsLoadingListVisits(false)
        })
        .catch(err => {
          setErrResponse(err)
          setIsLoadingListVisits(false)
        })
    }
  }, [])

  return (
    <ContainerVisits>
      <HeaderSection />
      <ContentStylesSection>
        <ContainerFilters>
          <ItemFilterStyle>
            <ContainerText>
              <span>
                <Filter2 />
              </span>
              <span>Filtrar por</span>
            </ContainerText>
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectFilterStyles}
              placeholder="ID"
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            {/* <input placeHolder */}
            <DatePicker
              id="date-create-apartment"
              showIcon
              selected={daySelected}
              icon={<></>}
              toggleCalendarOnIconClick
              onChange={(date: any) => {
                setDaySelected(date)
                // setValue("date", date)
              }}
              placeholderText="Fecha"
              popperClassName="some-custom-class"
              popperPlacement="top-end"
              popperModifiers={[
                {
                  name: "myModifier",
                  fn(state) {
                    return state
                  },
                },
              ]}
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectFilterStyles}
              placeholder="Categoría"
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectFilterStyles}
              placeholder="Estado"
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            <ContainerReset>
              <span>
                <Replay />
              </span>
              <span>Reiniciar filtro</span>
            </ContainerReset>
          </ItemFilterStyle>
        </ContainerFilters>
        <ContainerListVisits>
          <Table>
            <Table.Header>
              <tr>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>FOTO</Table.Cell>
                <Table.Cell>DIRECCIÓN</Table.Cell>
                <Table.Cell>FECHA DE VISITA</Table.Cell>
                <Table.Cell>CATEGORÍA</Table.Cell>
                <Table.Cell>ESTADO</Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              {listVisits.map(vis => (
                <Table.Row key={vis.id}>
                  <Table.Cell>{vis.id}</Table.Cell>
                  <Table.Cell>
                    <ContainerImageVisit>
                      <img src={vis.image} />
                    </ContainerImageVisit>
                  </Table.Cell>
                  <Table.Cell>{vis.address}</Table.Cell>
                  <Table.Cell>{vis.date}</Table.Cell>
                  <Table.Cell>{vis.category}</Table.Cell>
                  <Table.Cell>
                    <StatusCell status={vis.status}>{vis.status}</StatusCell>
                  </Table.Cell>
                  {/* <Table.Cell>
                    <ContainerActionsTable>
                      <ButtonAction onClick={() => openModal(ord)}>
                        <EditAltIcon />
                      </ButtonAction>
                      <ButtonAction onClick={() => openDeleteModal(ord)}>
                        <TrashIcon />
                      </ButtonAction>
                      <ButtonAction>
                        <ThreeDotsIcon />
                      </ButtonAction>
                    </ContainerActionsTable>
                  </Table.Cell> */}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </ContainerListVisits>
      </ContentStylesSection>
    </ContainerVisits>
  )
}

export default Visits
