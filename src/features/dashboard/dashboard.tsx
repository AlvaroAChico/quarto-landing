import React, { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import {
  ContainerDashboard,
  ContainerDashboardBody,
  ContainerDashboardHeader,
} from "./dashboard.styles"
import StadisticsCard from "./components/stadistics-card"
import {
  StadisticsDashboardDTO,
  StadisticsPropertiesDashboardDTO,
} from "../../core/models/interfaces/property-model"
import { ApexOptions } from "apexcharts"
import axios from "axios"
import { settingsApp } from "../../config/environment/settings"
import { ServiceCreatedDTO } from "../../core/models/interfaces/services-model"
import useDataUser from "../../utils/use-data-user"
import { APP_MENU } from "../../constants/app"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../config/routes/path"
import { FilterPermissionsDTO } from "../../core/models/interfaces/user-model"

// El componente Dashboard
const Dashboard: React.FC = () => {
  const [dataPermissions, setDataPermissions] =
    React.useState<FilterPermissionsDTO>()
  const { handleGetToken, clearAllDataAPP, handleGetPermissions } =
    useDataUser()
  const navigate = useNavigate()

  React.useEffect(() => {
    // Verify Token
    const storedToken = handleGetToken()
    if (!storedToken) {
      clearAllDataAPP()
      navigate(pathRoutes.SIGN_IN)
    }
    // Verify Permissions
    const data = handleGetPermissions()
    setDataPermissions(data)
    if (!!data && !data?.dashboard.includes(APP_MENU.LIST)) {
      return
    }
  }, [])

  const initialStadisticsProperties: StadisticsPropertiesDashboardDTO = {
    total: 0,
    onhold: 0,
    active: 0,
    inactive: 0,
  }

  const [residentials, setResidentials] =
    useState<StadisticsPropertiesDashboardDTO>(initialStadisticsProperties)
  const [services, setServices] = useState<StadisticsPropertiesDashboardDTO>(
    initialStadisticsProperties,
  )
  const [contractors, setContractors] =
    useState<StadisticsPropertiesDashboardDTO>(initialStadisticsProperties)

  // Inicializar datos para el gráfico
  const [chartSeries, setChartSeries] = useState<
    { name: string; data: number[] }[]
  >([])

  useEffect(() => {
    // Obtener datos de estadística
    axios
      .get(`${settingsApp.api.base}/stadistics`)
      .then(response => {
        const data: StadisticsDashboardDTO = response.data
        setResidentials(data.residentials)
        setServices(data.services)
        setContractors(data.contractors)

        // Inicializar datos para los servicios
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]
        const initialData = months.map(() => 0)
        const serviceCounts = {
          clean: [...initialData],
          paint: [...initialData],
          miscellaneous: [...initialData],
          resourfacing: [...initialData],
        }

        // Obtener servicios y contar por mes
        axios
          .get(`${settingsApp.api.base}/services/`)
          .then(response => {
            const services: ServiceCreatedDTO[] = response.data
            services.forEach(service => {
              const monthIndex = new Date(service.createdAt).getMonth()
              switch (service.serviceType.name) {
                case "clean":
                  serviceCounts.clean[monthIndex] += 1
                  break
                case "paint":
                  serviceCounts.paint[monthIndex] += 1
                  break
                case "miscellaneous":
                  serviceCounts.miscellaneous[monthIndex] += 1
                  break
                case "resourfacing":
                  serviceCounts.resourfacing[monthIndex] += 1
                  break
                default:
                  break
              }
            })

            setChartSeries([
              { name: "Clean", data: serviceCounts.clean },
              { name: "Paint", data: serviceCounts.paint },
              { name: "Miscellaneous", data: serviceCounts.miscellaneous },
              { name: "Resourfacing", data: serviceCounts.resourfacing },
            ])
          })
          .catch(error => console.error("Error fetching services data:", error))
      })
      .catch(error => console.error("Error fetching statistics data:", error))
  }, [])

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "Number of Services",
      },
      tickAmount: 6,
      min: 0,
      max: 30,
      labels: {
        formatter: value => value.toString(),
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return val
        },
      },
    },
  }

  return (
    <ContainerDashboard>
      <ContainerDashboardHeader>
        <StadisticsCard data={residentials} name="Residentials" />
        <StadisticsCard data={services} name="Customers" />
        <StadisticsCard data={contractors} name="Contractors" />
      </ContainerDashboardHeader>
      {/* <ContainerDashboardBody>
        <ReactApexChart
          options={options}
          series={chartSeries}
          type="bar"
          height={350}
          width={1000}
        />
      </ContainerDashboardBody> */}
    </ContainerDashboard>
  )
}

export default Dashboard
