import React from "react"
import { StadisticsPropertiesDTO } from "../../../../core/models/interfaces/property-model"
import {
  ContainerCard,
  ContainerChart,
  ContainerDataStats,
  ContainerHeadTitle,
} from "./project-card.styles"
import ReactApexChart from "react-apexcharts"
import { ApexOptions } from "apexcharts"

interface IOwnProps {
  data: StadisticsPropertiesDTO
  name: string
}

const ProjectCard: React.FC<IOwnProps> = ({ data, name }) => {
  const series = [data.complete, data.pending, data.todo]
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
    labels: [
      `Complete ${data.complete}`,
      `Pending ${data.pending}`,
      `To do ${data.todo}`,
    ],
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

export default ProjectCard
