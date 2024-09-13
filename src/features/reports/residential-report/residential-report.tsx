import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../config/routes/path"
import {
  CardInfoReport,
  ContainerBodyScrool,
  ContainerFilterBody,
  ContainerResidentialReport,
  ContainerResidentialReportBody,
  ContainerResidentialReportHeader,
  ContainerTopList,
} from "./residential-report.styles"
import Select from "react-select"
import {
  ContainerBody,
  ContainerHead,
  ContainerTable,
  WrapperInput,
} from "../../../config/theme/global-styles"
import Input from "../../../components/input/input"
import { Search } from "styled-icons/bootstrap"
import Skeleton from "react-loading-skeleton"
import { monthsSelect } from "../../../constants/app"
import { ResidentialReportDTO } from "../../../core/models/interfaces/project-model"
import axios from "axios"
import { settingsApp } from "../../../config/environment/settings"

const ResidentialReport: React.FC = () => {
  const navigate = useNavigate()
  const [residentials, setResidentials] = useState<ResidentialReportDTO[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalRecords, setTotalRecords] = useState<number>(0)
  const [totalApartments, setTotalApartments] = useState<number>(0)

  const handleClick = () => {
    navigate(pathRoutes.PROJECTS.CREATE)
  }

  useEffect(() => {
    const fetchResidentials = async () => {
      try {
        const response = await axios.get<ResidentialReportDTO[]>(
          `${settingsApp.api.base}/residentials/report`,
        )
        const data = response.data
        setResidentials(data)
        setTotalRecords(data.length)
        setTotalApartments(
          data.reduce(
            (sum, residential) => sum + residential.numberapartaments,
            0,
          ),
        )
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    fetchResidentials()
  }, [])

  return (
    <ContainerResidentialReport>
      <ContainerResidentialReportHeader>
        <CardInfoReport>
          <h1> {totalRecords}</h1>
          <span>Residentials</span>

        </CardInfoReport>
        <CardInfoReport>
        <h1> {totalApartments}</h1>
        <span>Apartaments</span>
        </CardInfoReport>
      </ContainerResidentialReportHeader>
      <ContainerResidentialReportBody>
        <ContainerFilterBody>
          <ContainerTable>
            <ContainerTopList>
              <WrapperInput>
                <Input
                  id="email-create-user"
                  placeholder="Search"
                  icon={Search}
                  props={undefined}
                />
              </WrapperInput>

              <Select
                options={monthsSelect}
                isSearchable={false}
                placeholder="Month"
              />
            </ContainerTopList>

            <table>
              <ContainerHead>
                <tr>
                  <td width={300}>Nombre</td>
                  <td>Cantidad de Apartamentos</td>
                  <td>Cantidad de Servicios Activos</td>
                  <td>Cantidad de Servicios completados</td>
                  <td></td>
                </tr>
              </ContainerHead>
            </table>

            <ContainerBodyScrool>
              {loading ? (
                <tr>
                  <td colSpan={5}>
                    <Skeleton count={5} />
                  </td>
                </tr>
              ) : (
                residentials.map(residential => (
                  <div className="tr" key={residential.id}>
                    <span>{residential.name}</span>
                    <span>{residential.numberapartaments}</span>
                    <span>{residential.numberservices}</span>
                    <span>{residential.numberservicescompleted}</span>
                  </div>
                ))
              )}
            </ContainerBodyScrool>
          </ContainerTable>
        </ContainerFilterBody>
      </ContainerResidentialReportBody>
    </ContainerResidentialReport>
  )
}

export default ResidentialReport
