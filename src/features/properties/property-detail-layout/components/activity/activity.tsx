import React from "react"
import {
  ContainerActivity,
  Header,
  ActivityStreamText,
  ContainerActivitiesStream,
  ActivityItem,
  ImageContainer,
  DetailsContainer,
  UserName,
  ActivityDescription,
  RightSideContainer,
  SmallBox,
} from "./activity.styles"
import { useNavigate } from "react-router-dom"
import useDataUser from "../../../../../utils/use-data-user"
import { pathRoutes } from "../../../../../config/routes/path"
import { APP_MENU } from "../../../../../constants/app"

const DetailsActivity: React.FC = () => {
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

  const activities = new Array(10).fill(null).map((_, index) => ({
    id: index,
    userName: "TonyCook", // Puedes modificar estos datos según sea necesario
    description: `added ${index + 1} files to project`,
  }))

  return (
    <ContainerActivity>
      <Header>
        <ActivityStreamText>Activity Stream</ActivityStreamText>
      </Header>
      <ContainerActivitiesStream>
        {activities.map(activity => (
          <ActivityItem key={activity.id}>
            <ImageContainer></ImageContainer>
            <DetailsContainer>
              <UserName>{activity.userName}</UserName>
              <ActivityDescription>{activity.description}</ActivityDescription>
            </DetailsContainer>
            <RightSideContainer>
              <SmallBox />
              <SmallBox />
            </RightSideContainer>
          </ActivityItem>
        ))}
      </ContainerActivitiesStream>
    </ContainerActivity>
  )
}

export default DetailsActivity
