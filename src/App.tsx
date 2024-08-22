import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { GlobalStyles } from "./config/theme/global-styles"

const App = () => {
  return (
    <>
      <Outlet />
      <GlobalStyles />
      <Toaster richColors />
    </>
  )
}

export default App
