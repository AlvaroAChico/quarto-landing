import React from "react"
import {
  ContainerListInfoStats,
  ContainerMovements,
  ContainerWallet,
  ContainerWinningsStats,
  StatusCellMovement,
} from "./wallet.styles"
import HeaderSection from "../../components/header-section/header-section"
import CardStatsWallet from "./components/card-stats-wallet/card-stats-wallet"
import totalIMG from "../../assets/img/icons/paid_white.svg"
import comissionIMG from "../../assets/img/icons/money_bag.svg"
import bonoIMG from "../../assets/img/icons/request_quote.svg"
import Table from "../../components/table/table"
import { MovementDTO } from "../../core/models/interfaces/movement-model"
import { movementRepository } from "../../api/repositories/movement-repository"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { palette } from "../../config/theme/theme"
import { months } from "../../constants/app"
import MovementJSON from "../../config/mocks/features/movements/movements-list.json"

const Wallet = () => {
  const [listMovements, setListMovements] = React.useState<MovementDTO[]>([])
  const [isLoadFetchData, setIsLoadFetchData] = React.useState<boolean>(false)

  const fetchDataList = React.useCallback(async () => {
    setIsLoadFetchData(true)
    try {
      const response: MovementDTO[] =
        (await movementRepository.getMovements()) as MovementDTO[]
      console.log("response => ", response)
      if (!!response) {
        setListMovements(response)
      }
      setIsLoadFetchData(false)
    } catch (error) {
      setIsLoadFetchData(false)
    }
  }, [])

  React.useEffect(() => {
    const fetchDataAsync = async () => {
      await Promise.all([fetchDataList()])
    }

    fetchDataAsync()
  }, [])

  //  STATS
  const series = [
    {
      name: "series1",
      data: [
        3000, 3500, 5000, 4500, 5200, 3200, 4000, 4500, 5000, 5500, 6000, 6500,
      ],
    },
  ]

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    colors: [palette.primaryColor],
    xaxis: {
      type: "category",
      categories: months,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }

  return (
    <>
      <HeaderSection />
      <ContainerWallet>
        <ContainerListInfoStats>
          <CardStatsWallet
            activeCard={true}
            title="Total"
            icon={totalIMG}
            amount={2300}
            date={"Noviembre 2024"}
          />
          <CardStatsWallet
            title="Total"
            icon={comissionIMG}
            amount={1500}
            date={"Noviembre 2024"}
          />
          <CardStatsWallet
            title="Total"
            icon={bonoIMG}
            amount={800}
            date={"Noviembre 2024"}
          />
        </ContainerListInfoStats>
        <ContainerWinningsStats>
          <h2>Ganancias</h2>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </ContainerWinningsStats>
        <ContainerMovements>
          <Table>
            <Table.Header>
              <tr>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>DESCRIPCIÓN</Table.Cell>
                <Table.Cell>MONTO</Table.Cell>
                <Table.Cell>ESTADO</Table.Cell>
              </tr>
            </Table.Header>
            <Table.Body>
              {(listMovements.length > 0 ? listMovements : MovementJSON).map(
                it => (
                  <Table.Row key={it.id}>
                    <Table.Cell>{it.id}</Table.Cell>
                    <Table.Cell>{it.description}</Table.Cell>
                    <Table.Cell>{it.amount}</Table.Cell>
                    <Table.Cell>
                      <StatusCellMovement status={it.status}>
                        {it.status}
                      </StatusCellMovement>
                    </Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        </ContainerMovements>
      </ContainerWallet>
    </>
  )
}

export default Wallet
