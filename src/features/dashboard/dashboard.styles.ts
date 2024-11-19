import styled from "styled-components"
import { breakpoints } from "../../constants/breakpoints"
import { SwiperSlide } from "swiper/react"
import { palette } from "../../config/theme/theme"

export const ContainerDashboard = styled.div`
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  width: 100%;
  gap: 20px;

  ${breakpoints.tabletMediumMax} {
    flex-direction: column;
  }
`

export const ContainerDashboardBody = styled.div`
  box-shadow: 8px 10px 30px 4px rgba(238, 236, 243, 1);
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  display: flex;
  height: 60%;
  width: 80%;
`

export const ContainerAdds = styled.div`
  padding: 40px 0;
`

export const ItemSwiperAdd = styled(SwiperSlide)`
  background: ${palette.blueColor};
  justify-content: space-between;
  color: ${palette.whiteColor};
  border-radius: 15px;
  flex-direction: row;
  padding: 0;
  margin: 0;
  display: flex;
  width: 100%;
  gap: 10px;
`

export const ContainerTextAdd = styled.div`
  padding: 40px 0 40px 80px;
  width: 40%;

  > h3 {
    font-size: 2.6rem;
    font-weight: 800;
  }

  > p {
    font-size: 1.2rem;
    font-weight: 200;
  }

  &:nth-chikd(2) {
    width: 100%;
    max-width: 200px;
  }
`

export const ContainerImageAdd = styled.div`
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  width: 60%;

  > img {
    height: auto;
    max-width: 350px;
  }
`

export const ContainerCalculator = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 100%;

  ${breakpoints.laptopMediumMax} {
    flex-direction: column;
  }
`

export const FormContainer = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ContainerItemCalcDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`

export const ItemCalcDetail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  ${breakpoints.tabletLargeMax} {
    flex-direction: column;
  }
`

export const CalculatorForm = styled.div`
  width: calc(60% - 20px);
  border-radius: 20px;
  background: white;
  padding: 40px;

  ${breakpoints.laptopMediumMax} {
    width: 100%;
  }
`

export const CalculatorDetail = styled.div`
  width: calc(40% - 20px);
  border-radius: 20px;
  background: white;
  padding: 40px;

  ${breakpoints.laptopMediumMax} {
    width: 100%;
  }
`
