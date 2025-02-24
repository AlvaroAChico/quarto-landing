import styled from "styled-components"

export const FeatureSectionWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 50px 0;
  gap: 30px;
`

export const FeatureColumn = styled.div`
  flex-direction: column;
  justify-content: center;
  min-width: 250px;
  display: flex;
  gap: 30px;
`

export const FeatureCard = styled.div<{ backgroundColor: string }>`
  background-color: ${props => props.backgroundColor};
  border-radius: 24px;
  position: relative;
  min-height: 320px;
  display: grid;
  padding: 40px;
  width: 100%;
  // max-width: 550px;
  // flex-direction: column;
  // overflow: hidden;
  // justify-content: start;

  // @media (max-width: 991px) {
  //   max-width: 100%;
  // }
`

export const FeatureUpCard = styled(FeatureCard)<{ backgroundColor: string }>`º`

export const FeatureDownCard = styled(FeatureCard)<{
  backgroundColor: string
}>`
  grid-template-columns: 1fr 1fr;
  align-items: top;
  display: grid;
`

export const FeatureContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-family:
    DM Sans,
    sans-serif;
  color: #000;
  justify-content: flex-start;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`

export const FeatureDownContent = styled(FeatureContent)`
  color: white;
`

export const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 38px;
  letter-spacing: -0.96px;
`

export const FeatureSubtitle = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.6px;
  margin-top: 10px;
`

export const FeatureImage = styled.img`
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  max-width: 350px;
  object-fit: contain;
  object-position: center;
`

export const DiscoverSection = styled.div`
  background-color: #00c49a;
  position: relative;
  border-radius: 24px;
  display: grid;
  grid-template-rows: fit-content(100%) 1fr;
  overflow: hidden;
  padding: 40px;
  // letter-spacing: -0.96px;
  font:
    700 32px/38px DM Sans,
    sans-serif;
`

export const DiscoverTitle = styled.h2`
  font-size: 2rem;
`

export const DiscoverImage = styled.img`
  aspect-ratio: 0.78;
  object-fit: contain;
  object-position: center;
  max-width: 350px;
  width: 100%;
  border-radius: 24px 24px 0 0;
  position: absolute;
  z-index: 0;
  margin: auto;
  bottom: 0;
  right: 0;
  left: 0;
`

export const PingImage = styled.img`
  aspect-ratio: 0.78;
  object-fit: contain;
  object-position: center;
  max-width: 350px;
  width: 100%;
  z-index: 0;
  margin: auto;
  bottom: 0;
  right: 0;
  left: 0;
`
