import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import useLocalStorageState from "use-local-storage-state";
import { THEME_PALETTE_KEY } from "./utils/constants";

const queryClient = new QueryClient();

function App() {
  const [themePalette] = useLocalStorageState<"dark" | "light">(
    THEME_PALETTE_KEY,
    { defaultValue: "light" },
  );
  const defaultTheme = createTheme({
    palette: {
      mode: themePalette,
    },
  });

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <SnackbarProvider
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <RouterProvider router={router} />
          </SnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
