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
import { useNavigate, useParams } from "react-router-dom"
import { PropertyDTO } from "../../../../../core/models/interfaces/property-model"
import useDataUser from "../../../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../../../config/environment/settings"
import { toast } from "sonner"
import { APP_MENU, CURRENCY_APP } from "../../../../../constants/app"
import Skeleton from "react-loading-skeleton"
import { pathRoutes } from "../../../../../config/routes/path"

const DetailsOverview: React.FC = () => {
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
    if (
      !!data &&
      !Object.values(APP_MENU).some(permission =>
        data?.property.includes(permission),
      )
    ) {
      return
    }
  }, [])

  const [dataProperty, setDataProperty] = React.useState<PropertyDTO>()
  const [isLoadingDataProperty, setIsLoadingDataProperty] =
    React.useState<boolean>(false)
  const { id: idProperty } = useParams<{ id: string }>()

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(() => {
    setIsLoadingDataProperty(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/residentials/${idProperty}?include=management_company,apartments`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          const dataResponse: PropertyDTO = response.data[0] as PropertyDTO
          if (!!dataResponse) {
            setDataProperty(dataResponse)
            // setStadisticts(dataResponse.stadistics)
          }
          setIsLoadingDataProperty(false)
        })
        .catch(err => {
          toast.error("Failed to fetch data")
          setIsLoadingDataProperty(false)
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
        {!isLoadingDataProperty ? (
          <CardComponent>
            <CardTitle>Progress Services</CardTitle>
            <CardInfo>
              <ArrowContainer>
                <ArrowIcon />
              </ArrowContainer>
              <CardText>{dataProperty?.apartments.length}</CardText>
            </CardInfo>
            <CircularChartContainer>
              <StyledApexCharts
                options={createChartOptions(dataProperty?.progress || 35)}
                series={[dataProperty?.progress || 48]}
                type="radialBar"
                height={150}
              />
              <PercentageText>{dataProperty?.progress || 48}%</PercentageText>
            </CircularChartContainer>
          </CardComponent>
        ) : (
          <Skeleton count={1} height={200} width={240} borderRadius={10} />
        )}
        {!isLoadingDataProperty ? (
          <CardComponent>
            <CardTitle>Pending Services</CardTitle>
            <CardSubTitle>23</CardSubTitle>
            <CircularChartContainer>
              <StyledApexCharts
                options={createChartOptions(dataProperty?.progress || 20)}
                series={[dataProperty?.progress || 20]}
                type="radialBar"
                height={150}
              />
              <PercentageText>{dataProperty?.progress || 20}%</PercentageText>
            </CircularChartContainer>
          </CardComponent>
        ) : (
          <Skeleton count={1} height={200} width={240} borderRadius={10} />
        )}
      </CardsContainer>
      <CardContainerGraphic>
        {!isLoadingDataProperty ? (
          <CardGraphic>
            <GraphicTitle>Additional Information</GraphicTitle>
            <GraphicSubtitle></GraphicSubtitle>
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
