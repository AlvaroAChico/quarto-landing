import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { RouterProvider } from "react-router-dom"
import { router } from "./config/routes/routes"
import { store } from "./core/store/store"
import { worker } from "./config/mocks/msw/browser" // Importa el worker de MSW
import { settingsApp } from "./config/environment/settings"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@mui/material/styles"
import { materialTheme } from "./config/theme/material-theme"

// Inicia el worker de MSW
// if (settingsApp.app.mocks) {
//   worker.start()
// }

const container = document.getElementById("root")
// worker.start({
//   serviceWorker: {
//     url: "/mockServiceWorker.js",
//   },
// })

// Crear una instancia de QueryClient
const queryClient = new QueryClient()

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={materialTheme}>
            <RouterProvider router={router} />
            <App />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
      ,
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
