import React from "react";

import { Provider } from "react-redux";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useAuth from "./hooks/useAuth";

import "./i18n";
import createTheme from "./theme";
import Router from "./routes";

import useTheme from "./hooks/useTheme";
import { store, persistor } from "./redux/store";
import createEmotionCache from "./utils/createEmotionCache";

import { AuthProvider } from "./contexts/JWTContext";
import Progress from "./pages/components/Progress";
import { PersistGate } from "redux-persist/integration/react";

const clientSideEmotionCache = createEmotionCache();

function App({ emotionCache = clientSideEmotionCache }) {
  const { isInitialized, user } = useAuth();
  const { theme } = useTheme();

  return (
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <Helmet titleTemplate="%s | App" defaultTitle="App - Aviación" />
        <Provider store={store}>
          <PersistGate loading={<Progress />} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MuiThemeProvider theme={createTheme(theme)}>
                <AuthProvider>
                  {isInitialized ? <Router /> : <Progress />}
                </AuthProvider>
              </MuiThemeProvider>
            </LocalizationProvider>
          </PersistGate>
        </Provider>
      </HelmetProvider>
    </CacheProvider>
  );
}

export default App;
