import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { GlobalStyles } from "./app.styles"

const App = () => {
  return (
    <GlobalStyles>
      <Outlet />
      <Toaster richColors />
    </GlobalStyles>
  )
}

export default App
