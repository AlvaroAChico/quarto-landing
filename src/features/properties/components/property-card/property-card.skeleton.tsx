import {
  ContainerCard,
  ContainerInfo,
  ContainerInfoProp,
} from "./property-card.styles"
import { FC } from "react"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

const PropertyCardSkeleton: FC = () => {
  return (
    <ContainerCard>
      <Skeleton height={200} borderRadius={10} />
      <ContainerInfo status={""} type={""}>
        <ContainerInfoProp>
          <Skeleton height={20} />
          <Skeleton width={"80%"} height={10} />
          <Skeleton width={"60%"} height={10} />
        </ContainerInfoProp>
      </ContainerInfo>
    </ContainerCard>
  )
}

export default PropertyCardSkeleton
