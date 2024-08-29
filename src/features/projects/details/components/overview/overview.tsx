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

const DetailsOverview: React.FC = () => {
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
      name: "Project A",
      data: [
        4500, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000,
        15000,
      ],
    },
    {
      name: "Project B",
      data: [
        3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000,
        14000,
      ],
    },
    {
      name: "Project C",
      data: [
        1500, 2500, 3500, 4500, 5500, 6500, 7500, 8500, 9500, 10500, 11500,
        12500,
      ],
    },
  ]

  return (
    <Container>
      <CardsContainer>
        <CardComponent>
          <CardTitle>Progreso</CardTitle>
          <CardInfo>
            <ArrowContainer>
              <ArrowIcon />
            </ArrowContainer>
            <CardText>+0.8%</CardText>
          </CardInfo>
          <CircularChartContainer>
            <StyledApexCharts
              options={createChartOptions(63)}
              series={[63]}
              type="radialBar"
              height={150}
            />
            <PercentageText>63%</PercentageText>
          </CircularChartContainer>
        </CardComponent>

        <CardComponent>
          <CardTitle>Tareas Hechas</CardTitle>
          <CardSubTitle>125</CardSubTitle>

          <CardInfo>
          <ArrowContainer>
              <ArrowIcon />
            </ArrowContainer>            <CardText>+1.2%</CardText>
          </CardInfo>
          <CircularChartContainer>
            <StyledApexCharts
              options={createChartOptions(75)}
              series={[75]}
              type="radialBar"
              height={150}
            />
            <PercentageText>75%</PercentageText>
          </CircularChartContainer>
        </CardComponent>

        <CardComponent>
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
        </CardComponent>
      </CardsContainer>

      <CardContainerGraphic>
        <CardGraphic>
          <GraphicTitle>Project Budget</GraphicTitle>
          <GraphicSubtitle>$120,430.00</GraphicSubtitle>
          <StyledApexCharts
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
            height={250}
          />
        </CardGraphic>
      </CardContainerGraphic>
    </Container>
  )
}

export default DetailsOverview
