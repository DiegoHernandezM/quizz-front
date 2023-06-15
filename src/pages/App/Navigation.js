import React, { useState, useEffect } from "react";
import { withTheme } from "@emotion/react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import {
  Quiz as QuizIcon,
  Subject as SubjectIcon,
  Checklist as CheckListIcon,
  Home as HomeIcon,
  Launch as LaunchIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router";

const NavbarSimple = ({ onDrawerToggle }) => {
  const navigate = useNavigate();
  const [isReadyForInstall, setIsReadyForInstall] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      console.log("oops, no prompt event guardado en window");
      return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    window.deferredPrompt = null;
    setIsReadyForInstall(false);
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
      }}
      elevation={10}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Inicio"
          icon={<HomeIcon />}
          onClick={() => navigate("/dashboardapp")}
        />
        {isReadyForInstall && (
          <BottomNavigationAction
            label="Crear Acceso Directo"
            icon={<LaunchIcon />}
            onClick={downloadApp}
          />
        )}
        <BottomNavigationAction
          label="Materias"
          icon={<SubjectIcon />}
          onClick={() => navigate("/dashboardapp/app")}
        />
        <BottomNavigationAction
          label="Test Simulacro"
          icon={<QuizIcon />}
          onClick={() => {
            navigate("/dashboardapp/test");
            window.location.reload();
          }}
        />
        <BottomNavigationAction
          label="Progreso y Resultados"
          icon={<CheckListIcon />}
          onClick={() => navigate("/dashboardapp/results")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default withTheme(NavbarSimple);
