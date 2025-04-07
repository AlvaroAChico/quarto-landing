import { createTheme } from "@mui/material/styles"

// Opcional: crea un tema personalizado
export const materialTheme = createTheme({
  palette: {
    primary: {
      main: "#00C49A",
    },
    secondary: {
      main: "#F9AE36",
    },
  },

  typography: {
    fontFamily: "DM Sans, sans-serif",
    allVariants: {
      color: "#242424",
    },
  },
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          border: "none",
          outline: "none",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#00C49A",
          },
          "&.Mui-focused": {
            borderColor: "transparent",
          },
        },
        icon: {
          color: "#00C49A",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          border: "none",
          outline: "none",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#00C49A",
          },
          "&.Mui-focused": {
            borderColor: "#00C49A",
          },
          "& .MuiInputBase-input": {
            borderRadius: 10, // Rounded borders for the input inside
          },
          "& .MuiInputBase-root": {
            borderRadius: 10, // Rounded borders for the input inside
          },
        },
      },
    },
  },
})
