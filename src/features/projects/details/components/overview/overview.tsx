import React from "react"
import {
  Container,
  CardsContainer,
  CardComponent,
  CardTitle,
  CardInfo,
  ArrowIcon,
  CardText,
  CircularChartContainer,
  PercentageText,
  StyledApexCharts,
  CardGraphic,
  GraphicTitle,
  GraphicSubtitle,
  CardContainerGraphic,
  CardSubTitle,
  ArrowContainer,
} from "./overview.styles"
import { useParams } from "react-router-dom"
import { ProjectDTO } from "../../../../../core/models/interfaces/project-model"
import useDataUser from "../../../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../../../config/environment/settings"
import { toast } from "sonner"
import { CURRENCY_APP } from "../../../../../constants/app"
import Skeleton from "react-loading-skeleton"

const DetailsOverview: React.FC = () => {
  const [dataProject, setDataProject] = React.useState<ProjectDTO>()
  const [isLoadingDataProject, setIsLoadingDataProject] =
    React.useState<boolean>(false)
  const { id: idProject } = useParams<{ id: string }>()

  const { handleGetToken } = useDataUser()

  React.useEffect(() => {
    fetchDataProjects()
  }, [])

  const fetchDataProjects = React.useCallback(() => {
    setIsLoadingDataProject(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/projects?include=tasks&filter[id]=${idProject}`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const dataResponse: ProjectDTO = response.data[0] as ProjectDTO
          if (!!dataResponse) {
            setDataProject(dataResponse)
            // setStadisticts(dataResponse.stadistics)
          }
          setIsLoadingDataProject(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingDataProject(false)
        })
    }
  }, [])

  const createChartOptions = (percentage: number) => ({
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "80%",
          background: "transparent",
        },
        track: {
          background: "#e0e0e0",
          strokeWidth: "100%",
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    fill: {
      type: "solid",
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["#ff6600"],
    series: [percentage],
  })

  const lineChartOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
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
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Amount ($)",
      },
      labels: {
        formatter: (value: number) => `$${value}`,
      },
    },
    legend: {
      position: "top",
    },
    colors: ["#ff6600", "#00aaff", "#77ff00"],
  }

  const lineChartSeries = [
    {
      name: "Data A",
      data: [
        14000, 5000, 6000, 7000, 18000, 3000, 10000, 11000, 1500, 13000, 4500,
        15000,
      ],
    },
    {
      name: "Data B",
      data: [
        1000, 12000, 8000, 8500, 10000, 4500, 9000, 9200, 4500, 12000, 10000,
        14000,
      ],
    },
    {
      name: "Data C",
      data: [
        1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500,
        12500,
      ],
    },
  ]

  return (
    <Container>
      <CardsContainer>
        {!isLoadingDataProject ? (
          <CardComponent>
            <CardTitle>Progreso</CardTitle>
            <CardInfo>
              <ArrowContainer>
                <ArrowIcon />
              </ArrowContainer>
              <CardText>{dataProject?.status}</CardText>
            </CardInfo>
            <CircularChartContainer>
              <StyledApexCharts
                options={createChartOptions(dataProject?.progress || 0)}
                series={[dataProject?.progress || 0]}
                type="radialBar"
                height={150}
              />
              <PercentageText>{dataProject?.progress || 0}%</PercentageText>
            </CircularChartContainer>
          </CardComponent>
        ) : (
          <Skeleton count={1} height={200} width={240} borderRadius={10} />
        )}
        {!isLoadingDataProject ? (
          <CardComponent>
            <CardTitle>Tareas Hechas</CardTitle>
            <CardSubTitle>
              {
                dataProject?.tasks.filter(task => task.status == "completed")
                  .length
              }
            </CardSubTitle>

            {/* <CardInfo>
            <ArrowContainer>
            <ArrowIcon />
            </ArrowContainer>{" "}
            <CardText>+1.2%</CardText>
            </CardInfo> */}
            <CircularChartContainer>
              <StyledApexCharts
                options={createChartOptions(dataProject?.progress || 0)}
                series={[dataProject?.progress || 0]}
                type="radialBar"
                height={150}
              />
              <PercentageText>{dataProject?.progress || 0}%</PercentageText>
            </CircularChartContainer>
          </CardComponent>
        ) : (
          <Skeleton count={1} height={200} width={240} borderRadius={10} />
        )}
        {/* <CardComponent>
          <CardTitle>Objetivos</CardTitle>
          <CardSubTitle>36/100</CardSubTitle>
          <CardInfo>
          <ArrowContainer>
          <ArrowIcon />
            </ArrowContainer>
            <CardText>+2.5%</CardText>
          </CardInfo>
          <CircularChartContainer>
            <StyledApexCharts
              options={createChartOptions(45)}
              series={[45]}
              type="radialBar"
              height={150}
            />
            <PercentageText>45%</PercentageText>
          </CircularChartContainer>
        </CardComponent> */}
      </CardsContainer>
      <CardContainerGraphic>
        {!isLoadingDataProject ? (
          <CardGraphic>
            <GraphicTitle>Additional Information</GraphicTitle>
            <GraphicSubtitle>
              {!!dataProject &&
                dataProject.currency == CURRENCY_APP.USD &&
                "$ "}
              {!!dataProject && dataProject.price}
            </GraphicSubtitle>
            <StyledApexCharts
              options={lineChartOptions}
              series={lineChartSeries}
              type="line"
              height={250}
            />
          </CardGraphic>
        ) : (
          <Skeleton count={1} height={200} width={530} borderRadius={10} />
        )}
      </CardContainerGraphic>
    </Container>
  )
}

export default DetailsOverview
