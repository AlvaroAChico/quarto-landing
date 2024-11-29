import React from "react"
import { RentalDTO } from "../../core/models/interfaces/rental-model"
import useDataUser from "../../utils/use-data-user"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { setErrResponse } from "../../utils/erros-util"
import {
  ContainerImageRental,
  ContainerListRentals,
  ContainerRentals,
  ContentStylesSection,
  StatusCellRentals,
} from "./rentals.styles"
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
import { ArrowIosDownward } from "styled-icons/evaicons-solid"
import { rentalRepository } from "../../api/repositories/rental-repository"
import RentalsJSON from "../../config/mocks/features/rentals/rentals-list.json"

const Rentals: React.FC = () => {
  const [listRentals, setListRentals] = React.useState<RentalDTO[]>([])
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
  const [daySelectedPay, setDaySelectedPay] = React.useState<any>(null)

  const { handleGetToken } = useDataUser()
  const navigate = useNavigate()

  const [isLoadingListRentals, setIsLoadingListRentals] =
    React.useState<boolean>(false)

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(async () => {
    try {
      setIsLoadingListRentals(true)
      const response: RentalDTO[] =
        (await rentalRepository.getAll()) as RentalDTO[]
      if (!!response) {
        setListRentals(response)
      }
    } finally {
      setIsLoadingListRentals(false)
    }
  }, [])

  return (
    <ContainerRentals>
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
              placeholderText="Fecha de inicio"
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
            {/* <input placeHolder */}
            <DatePicker
              id="date-create-apartment"
              showIcon
              selected={daySelectedPay}
              icon={<></>}
              toggleCalendarOnIconClick
              onChange={(date: any) => {
                setDaySelectedPay(date)
                // setValue("date", date)
              }}
              placeholderText="Fecha de pago"
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
        <ContainerListRentals>
          <Table>
            <Table.Header>
              <tr>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>DIRECCIÓN</Table.Cell>
                <Table.Cell>FECHA DE INICIO</Table.Cell>
                <Table.Cell>FECHA DE PAGO</Table.Cell>
                <Table.Cell>ESTADO</Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              {(listRentals.length > 0 ? listRentals : RentalsJSON).map(vis => (
                <Table.Row key={vis.id}>
                  <Table.Cell>{vis.id}</Table.Cell>
                  <Table.Cell>{vis.address}</Table.Cell>
                  <Table.Cell>{vis.date_init}</Table.Cell>
                  <Table.Cell>{vis.date_payment}</Table.Cell>
                  <Table.Cell>
                    <StatusCellRentals status={vis.status}>
                      {vis.status}
                    </StatusCellRentals>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </ContainerListRentals>
      </ContentStylesSection>
    </ContainerRentals>
  )
}

export default Rentals
