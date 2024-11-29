import React from "react"
import HeaderSection from "../../components/header-section/header-section"
import {
  ContainerImageVisit,
  ContainerListVisits,
  ContainerVisits,
  ContentStylesSection,
  StatusCellVisits,
} from "./visits.styles"
import Table from "../../components/table/table"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import useDataUser from "../../utils/use-data-user"
import { useNavigate } from "react-router-dom"
import { VisitDTO } from "../../core/models/interfaces/visits-model"
import { setErrResponse } from "../../utils/erros-util"
import Select from "react-select"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  ContainerFilters,
  ContainerReset,
  ContainerResetMobileFilter,
  ContainerText,
  ItemFilterStyle,
  selectFilterStyles,
  selectStylesFilterTable,
} from "../../config/theme/global-styles"
import { Filter2 } from "@styled-icons/remix-line/Filter2"
import { Replay } from "@styled-icons/material/Replay"
import { Calendar4 } from "@styled-icons/bootstrap/Calendar4"
import { routeWithReplaceId } from "../../utils/path-util"
import { pathRoutes } from "../../config/routes/paths"
import { ArrowIosDownward } from "@styled-icons/evaicons-solid/ArrowIosDownward"
import { visitRepository } from "../../api/repositories/visit-repository"
import VisitsJSON from "../../config/mocks/features/visits/visits-list.json"

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
  const navigate = useNavigate()

  const [isLoadingListVisits, setIsLoadingListVisits] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(async () => {
    try {
      setIsLoadingListVisits(true)
      const response: VisitDTO[] =
        (await visitRepository.getAll()) as VisitDTO[]
      if (!!response) {
        setListVisits(response)
      }
    } finally {
      setIsLoadingListVisits(false)
    }
  }, [])

  const handleNavigateView = (id: string) => () =>
    navigate(routeWithReplaceId(pathRoutes.VISITS.otherPaths.VIEW.to, id))

  return (
    <ContainerVisits>
      <HeaderSection />
      <ContentStylesSection>
        <ContainerResetMobileFilter>
          <ContainerText>
            <span>
              <Filter2 />
            </span>
            <span>Filtrar por</span>
          </ContainerText>
          <ContainerReset>
            <span>
              <Replay />
            </span>
            <span>Reiniciar filtro</span>
          </ContainerReset>
        </ContainerResetMobileFilter>
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
              styles={selectStylesFilterTable}
              placeholder="ID"
              noOptionsMessage={() => <>Sin resultados</>}
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
            <span>
              <ArrowIosDownward />
            </span>
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectStylesFilterTable}
              placeholder="Categoría"
              noOptionsMessage={() => <>Sin resultados</>}
            />
          </ItemFilterStyle>
          <ItemFilterStyle>
            <Select
              defaultValue={selectedOptionId}
              onChange={handleChangeOptionId}
              options={optionsId}
              isSearchable={false}
              styles={selectStylesFilterTable}
              placeholder="Estado"
              noOptionsMessage={() => <>Sin resultados</>}
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
                <Table.Cell>DIRECCIÓN</Table.Cell>
                <Table.Cell>FECHA DE VISITA</Table.Cell>
                <Table.Cell>HORA</Table.Cell>
                <Table.Cell>CATEGORÍA</Table.Cell>
                <Table.Cell>ESTADO</Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              {(listVisits.length > 0 ? listVisits : VisitsJSON).map(vis => (
                <Table.Row
                  key={vis.id}
                  onDoubleClick={handleNavigateView(vis.id.toString())}
                >
                  <Table.Cell>{vis.id}</Table.Cell>
                  <Table.Cell>{vis.address}</Table.Cell>
                  <Table.Cell>{vis.date}</Table.Cell>
                  <Table.Cell>{"4:52pm"}</Table.Cell>
                  <Table.Cell>{vis.category}</Table.Cell>
                  <Table.Cell>
                    <StatusCellVisits status={vis.status}>
                      {vis.status}
                    </StatusCellVisits>
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
