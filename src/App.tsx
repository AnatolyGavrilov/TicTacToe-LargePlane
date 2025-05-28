import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { COLORS } from "./constants";
import { router } from "./common/router";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.BLUE_DARK,
    },
    secondary: {
      main: COLORS.BLUE_LIGHT,
    },
    background: {
      default: COLORS.WHITE_SMOKE,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
