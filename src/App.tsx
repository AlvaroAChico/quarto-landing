import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <Outlet />
      <Toaster richColors />
    </>
  )
}

export default App
