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

const DetailsActivity: React.FC = () => {
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
