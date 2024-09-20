import React from "react"
import { Outlet, useParams } from "react-router-dom"
import { useState } from "react"
import {
  DataBlock,
  DetailsContainer,
  TaskList,
  ImageContainer,
  InfoBlock,
  InfoItem,
  ContractorSection,
  IconWrapper,
  AddButton,
  Icon,
  Text,
  LeftSideDataBlock,
  InfoBlockUp,
  InfoBlockDown,
  NameProperty,
  RightSideDataBlock,
  PropertyMenu,
  MenuItem,
  CalendarIcon,
  ClientNameProperty,
  ContainerOutletPropertyDetails,
  InfoBlockAdress,
} from "./property-detail-layout.styles"
import { routeWithReplaceId } from "../../../utils/path-util"
import { pathRoutes } from "../../../config/routes/path"
import { PropertyDTO } from "../../../core/models/interfaces/property-model"
import useDataUser from "../../../utils/use-data-user"
import axios from "axios"
import { settingsApp } from "../../../config/environment/settings"
import { toast } from "sonner"
import { formatToDDMonth } from "../../../utils/date-util"
import Skeleton from "react-loading-skeleton"

const PropertyDetailLayout: React.FC = () => {
  const [dataProperty, setDataProperty] = React.useState<PropertyDTO>()
  const [isLoadingDataProperty, setIsLoadingDataProperty] =
    React.useState<boolean>(false)
  const { id: idProperty } = useParams<{ id: string }>()

  const { handleGetToken } = useDataUser()

  React.useEffect(() => {
    fetchDataProperties()
  }, [])

  const fetchDataProperties = React.useCallback(() => {
    setIsLoadingDataProperty(true)
    const storedToken = handleGetToken()
    if (!!storedToken) {
      axios
        .get(
          `${settingsApp.api.base}/residentials/${idProperty}?include=management_company`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          },
        )
        .then(response => {
          console.log("Response => ", response.data)
          const dataResponse: PropertyDTO[] = response.data as PropertyDTO[]
          if (!!dataResponse) {
            setDataProperty(dataResponse[0])
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

  return (
    <DetailsContainer>
      <DataBlock>
        <LeftSideDataBlock>
          <ImageContainer>
            <img src={!!dataProperty ? dataProperty?.picture : ""} />
          </ImageContainer>
          <InfoBlock>
            {/*Nombre del proyecto */}
            <InfoBlockUp>
              <NameProperty>
                {!isLoadingDataProperty ? (
                  !!dataProperty && dataProperty?.name
                ) : (
                  <Skeleton count={1} height={40} />
                )}
              </NameProperty>
            </InfoBlockUp>
            <InfoBlockDown>
              <InfoItem>
                <Text>
                  Manager:{" "}
                  <ClientNameProperty>
                    {!!dataProperty &&
                      !!dataProperty.managementCompany &&
                      dataProperty.managementCompany.managerName}
                  </ClientNameProperty>
                </Text>
              </InfoItem>
              <InfoItem>
                <Text>
                  Manager Phone:{" "}
                  <ClientNameProperty>
                    {!!dataProperty &&
                      !!dataProperty.managementCompany &&
                      dataProperty.managementCompany.managerPhone}
                  </ClientNameProperty>
                </Text>
              </InfoItem>
            </InfoBlockDown>
            <InfoBlockAdress>
              <Text>
                Address:{" "}
                <ClientNameProperty>
                  {!!dataProperty && dataProperty.address}
                </ClientNameProperty>
              </Text>
            </InfoBlockAdress>
          </InfoBlock>
        </LeftSideDataBlock>
      </DataBlock>
      <PropertyMenu>
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROPERTIES.DETAIL.OVERVIEW,
            `${idProperty}`,
          )}
        >
          Overview
        </MenuItem>
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROPERTIES.DETAIL.APARTMENTS,
            `${idProperty}`,
          )}
        >
          Apartments
        </MenuItem>
        <MenuItem
          to={routeWithReplaceId(
            pathRoutes.PROPERTIES.DETAIL.ACTIVITY,
            `${idProperty}`,
          )}
        >
          Activity
        </MenuItem>
      </PropertyMenu>
      <ContainerOutletPropertyDetails>
        <div>
          <Outlet />
        </div>
        <div></div>
      </ContainerOutletPropertyDetails>
    </DetailsContainer>
  )
}

export default PropertyDetailLayout
