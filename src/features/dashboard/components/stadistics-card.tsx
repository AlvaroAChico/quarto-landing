import React from "react"
import {
  ContainerCard,
  ContainerChart,
  ContainerDataStats,
  ContainerHeadTitle,
} from "./stadistics-card.styles"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"
import { StadisticsPropertiesDashboardDTO } from "../../../core/models/interfaces/project-model"

interface IOwnProps {
  data: StadisticsPropertiesDashboardDTO
  name: string
}

const StadisticsCard: React.FC<IOwnProps> = ({ data, name }) => {
  const series = []
  const labels = []
  var apartament = ""
  if (data.active > 0) {
    series.push(data.active)
    labels.push(`Active ${data.active}`)
  }

  if (data.inactive > 0) {
    series.push(data.inactive)
    labels.push(`Inactive ${data.inactive}`)
  }

  if (data.onhold !== undefined && data.onhold > 0) {
    series.push(data.onhold)
    labels.push(`On Hold ${data.onhold}`)
  }



  const options: ApexOptions = {
    chart: {
      width: 280,
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      position: "right",
      offsetY: 0,
      height: 100,
    },
    colors: ["#FA620C", "#F9B035", "#D8DBE4"],
    labels: labels,
  }

  return (
    <ContainerCard>
      <ContainerHeadTitle>
        <h4>
          <span>{data.total}</span> {name}
        </h4>
      </ContainerHeadTitle>
      <ContainerDataStats>
        <ContainerChart>
          <ReactApexChart
            options={options}
            series={series}
            type="donut"
            width={260}
          />
        </ContainerChart>
      </ContainerDataStats>
    </ContainerCard>
  )
}

export default StadisticsCard
