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
        "401",
        "402",
        "403",
        "404",
        "405",
        "406",
        "407",
        "408",
        "409",
        "410",
        "411",
        "412",
        "413",
        "414",
        "415",
      ],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return "$ " + val + " thousands"
        },
      },
    },
    colors: ["#ff6600", "#0066ff", "#77ff00"],
  }

  const lineChartSeries = [
    {
      name: "Pending",
      data: [2, 1, 3, 4, 4, 0, 0, 0, 1, 1, 2, 2, 4, 0, 1],
    },
    {
      name: "In progress",
      data: [1, 1, 0, 0, 0, 1, 2, 1, 0, 0, 2, 2, 0, 1, 1],
    },
    {
      name: "Completed",
      data: [1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 1],
    },
  ]

  return (
    <Container>
      <CardsContainer>
        {!isLoadingDataProject ? (
          <CardComponent>
            <CardTitle>Progress Services</CardTitle>
            <CardInfo>
              <ArrowContainer>
                <ArrowIcon />
              </ArrowContainer>
              <CardText>{dataProject?.apartments.length}</CardText>
            </CardInfo>
            <CircularChartContainer>
              <StyledApexCharts
                options={createChartOptions(dataProject?.progress || 35)}
                series={[dataProject?.progress || 48]}
                type="radialBar"
                height={150}
              />
              <PercentageText>{dataProject?.progress || 48}%</PercentageText>
            </CircularChartContainer>
          </CardComponent>
        ) : (
          <Skeleton count={1} height={200} width={240} borderRadius={10} />
        )}
        {!isLoadingDataProject ? (
          <CardComponent>
            <CardTitle>Pending Services</CardTitle>
            <CardSubTitle>
              {/* {
                dataProject?.tasks.filter(task => task.status == "completed")
                  .length
              } */}
              23
            </CardSubTitle>

            {/* <CardInfo>
            <ArrowContainer>
            <ArrowIcon />
            </ArrowContainer>{" "}
            <CardText>+1.2%</CardText>
            </CardInfo> */}
            <CircularChartContainer>
              <StyledApexCharts
                options={createChartOptions(dataProject?.progress || 20)}
                series={[dataProject?.progress || 20]}
                type="radialBar"
                height={150}
              />
              <PercentageText>{dataProject?.progress || 20}%</PercentageText>
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
              {/* {!!dataProject &&
                dataProject.currency == CURRENCY_APP.USD &&
                "$ "}
              {!!dataProject && dataProject.price} */}
            </GraphicSubtitle>
            <StyledApexCharts
              options={lineChartOptions}
              series={lineChartSeries}
              type="bar"
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
