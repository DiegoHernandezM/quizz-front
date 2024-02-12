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
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      console.log("entro al primer window", event);
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
    if (deferredInstallPrompt === null) {
      window.addEventListener("beforeinstallprompt", (e) => {
        // Previene a la mini barra de información que aparezca en smartphones
        e.preventDefault();
        // Guarda el evento para que se dispare más tarde
        setDeferredInstallPrompt(e);
        // Actualizar la IU para notificarle al usuario que se puede instalar tu PWA

        // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
        console.log(`'beforeinstallprompt' event was fired.`);
      });
    }
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

  const press = (e) => {
    console.log("deferredinstall", deferredInstallPrompt);
    console.log("isReady", isReadyForInstall);
    // saveBeforeInstallPromptEvent(e);
    installPWA(e);
  };

  // CODELAB: Add event listener for beforeinstallprompt event
  // window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

  /**
   * Event handler for beforeinstallprompt event.
   *   Saves the event & shows install button.
   *
   * @param {Event} evt
   */
  function saveBeforeInstallPromptEvent(evt) {
    console.log("ahoy");
    // CODELAB: Add code to save event & show the install button.
    deferredInstallPrompt = evt;
    console.log("HERE");
  }

  /**
   * Event handler for butInstall - Does the PWA installation.
   *
   * @param {Event} evt
   */
  function installPWA(evt) {
    // CODELAB: Add code show install prompt & hide the install button.
    console.log("Clicked");
    console.log(deferredInstallPrompt);
    deferredInstallPrompt.prompt(); //LINE 50 HERE**
    // Hide the install button, it can't be called twice.
    // evt.srcElement.setAttribute('hidden', true);
    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        console.log("User accepted the A2HS prompt", choice);
      } else {
        console.log("User dismissed the A2HS prompt", choice);
      }
      // setDeferredInstallPrompt = null;
    });
  }

  // CODELAB: Add event listener for appinstalled event

  /**
   * Event handler for appinstalled event.
   *   Log the installation to analytics or save the event somehow.
   *
   * @param {Event} evt
   */
  function logAppInstalled(evt) {
    // CODELAB: Add code to log the event
    window.addEventListener("appinstalled", logAppInstalled);
    console.log("Weather App was installed.", evt);
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
