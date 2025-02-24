import React from "react"
import PropertySearch from "./sections/property-search/property-search"
import FeatureSection from "./sections/feature-section/feature-section"
import PublishProperty from "./sections/publish-property/publish-property"
import FAQ from "./sections/faq/faq"
import AppDownload from "./sections/app-download/app-download"
import { HomeAlquilerWrapper } from "./home.styles"

const Home: React.FC = () => {
  return (
    <HomeAlquilerWrapper>
      <PropertySearch />
      <FeatureSection />
      <PublishProperty />
      <FAQ />
      <AppDownload />
    </HomeAlquilerWrapper>
  )
}

export default Home
