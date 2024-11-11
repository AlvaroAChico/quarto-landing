import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../config/routes/paths"
import HeaderSection from "../../../components/header-section/header-section"
import {
  ContainerContractorReport,
  ContainerContractorReportHeader,
  ContainerContractorReportBody,
  CardContractor,
  ContainerFilterList,
  ContainerList,
} from "./contractor-report.styles"
import axios from "axios"
import { settingsApp } from "../../../config/environment/settings"
import { ContractorReportDTO } from "../../../core/models/interfaces/property-model"
import { WrapperInput } from "../../../config/theme/global-styles"
import Input from "../../../components/input/input"
import { Search } from "styled-icons/bootstrap"

const ContractorReport: React.FC = () => {
  const [activeCount, setActiveCount] = useState<number>(0)
  const [inactiveCount, setInactiveCount] = useState<number>(0)

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await axios.get<ContractorReportDTO[]>(
          `${settingsApp.api.base}/contractors/report`,
        )
        const contractors = response.data

        // Count active and inactive contractors
        const activeContractors = contractors.filter(
          contractor => contractor.status === "Active",
        ).length
        const inactiveContractors = contractors.filter(
          contractor => contractor.status === "Inactive",
        ).length

        setActiveCount(activeContractors)
        setInactiveCount(inactiveContractors)
      } catch (error) {
        console.error("Error fetching contractor data:", error)
      }
    }

    fetchContractors()
  }, [])

  return (
    <ContainerContractorReport>
      <ContainerContractorReportHeader>
        <CardContractor>
          <h1>{activeCount}</h1> <span>Active Contractors</span>
        </CardContractor>
        <CardContractor>
          <h1>{inactiveCount}</h1> <span>Inactive Contractors</span>
        </CardContractor>
      </ContainerContractorReportHeader>
      <ContainerContractorReportBody>
        <ContainerFilterList>
          <WrapperInput>
            <Input
              id="email-create-user"
              placeholder="Search"
              icon={Search}
              props={undefined}
            />
          </WrapperInput>
        </ContainerFilterList>
        <ContainerList></ContainerList>
      </ContainerContractorReportBody>
    </ContainerContractorReport>
  )
}

export default ContractorReport
