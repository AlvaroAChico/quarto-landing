import React from "react"
import { RentalDTO } from "../../core/models/interfaces/rental-model"
import useDataUser from "../../utils/use-data-user"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { setErrResponse } from "../../utils/erros-util"
import {
  ContainerButtonReferral,
  ContainerFilterActions,
  ContainerImageRental,
  ContainerListRentals,
  ContainerRentals,
  ContentStylesSection,
} from "./referrals.styles"
import HeaderSection from "../../components/header-section/header-section"
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
import Table from "../../components/table/table"
import { StatusCell } from "../../components/table/table.styles"
import { ReferralDTO } from "../../core/models/interfaces/referral-model"
import { ArrowIosDownward } from "styled-icons/evaicons-solid"
import Button from "../../components/button/button"
import { pathRoutes } from "../../config/routes/paths"

const Referrals: React.FC = () => {
  const [listRentals, setListRentals] = React.useState<ReferralDTO[]>([])
  // Filter ID
  const [optionsId, setOptionsId] = React.useState<any>([])
  const [selectedOptionId, setSelectedOptionId] = React.useState<any>(null)
  const handleChangeOptionId = (value: any) => {
    setSelectedOptionId(value)
    const listIds = listRentals.filter(prop => prop.id == value.value)
  }
  // Filter Category
  const [optionsCategory, setOptionsCategory] = React.useState<any>([])
  const [selectedOptionCategory, setSelectedOptionCategory] =
    React.useState<any>(null)
  const handleChangeOptionCategory = (value: any) => {
    setSelectedOptionCategory(value)
    const listIds = listRentals.filter(prop => prop.id == value.value)
  }
  // Filter Status
  const [optionsStatus, setOptionsStatus] = React.useState<any>([])
  const [selectedOptionStatus, setSelectedOptionStatus] =
    React.useState<any>(null)
  const handleChangeOptionStatus = (value: any) => {
    setSelectedOptionStatus(value)
    const listIds = listRentals.filter(prop => prop.id == value.value)
  }
  const [daySelected, setDaySelected] = React.useState<any>(null)

  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  const [isLoadingListRentals, setIsLoadingListRentals] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(() => {
    const storedToken = handleGetToken()
    if (storedToken) {
      setIsLoadingListRentals(true)
      axios
        .get(`${settingsApp.api.base}/referrals`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(response => {
          const dataResponse: ReferralDTO[] = response.data as ReferralDTO[]
          if (!!dataResponse) {
            setListRentals(dataResponse)
          }
          setIsLoadingListRentals(false)
        })
        .catch(err => {
          setErrResponse(err)
          setIsLoadingListRentals(false)
        })
    }
  }, [])

  return (
    <ContainerRentals>
      <HeaderSection />
      <ContentStylesSection>
        <ContainerFilterActions>
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
          <ContainerButtonReferral>
            <Button
              onClick={() =>
                navigate(pathRoutes.REFERRALS.otherPaths.CREATE.to)
              }
              text="Añadir Referido"
              customStyles={`
                background-color: #262626;`}
            />
          </ContainerButtonReferral>
        </ContainerFilterActions>
        <ContainerListRentals>
          <Table>
            <Table.Header>
              <tr>
                <Table.Cell>NOMBRE</Table.Cell>
                <Table.Cell>RESPONSABLE</Table.Cell>
                <Table.Cell>INGRESOS</Table.Cell>
                <Table.Cell>FECHA</Table.Cell>
                <Table.Cell>ESTADO</Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              {listRentals.map(vis => (
                <Table.Row key={vis.id}>
                  <Table.Cell>{vis.name}</Table.Cell>
                  <Table.Cell>{vis.responsible}</Table.Cell>
                  <Table.Cell>{vis.date}</Table.Cell>
                  <Table.Cell>{vis.income}</Table.Cell>
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
        </ContainerListRentals>
      </ContentStylesSection>
    </ContainerRentals>
  )
}

export default Referrals
