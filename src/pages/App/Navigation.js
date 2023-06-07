import React from "react";
import { withTheme } from "@emotion/react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import {
  Quiz as QuizIcon,
  Subject as SubjectIcon,
  Checklist as CheckListIcon,
  Home as HomeIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router";

const NavbarSimple = ({ onDrawerToggle }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100%" }}
      elevation={3}
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
          onClick={() => navigate("/dashboardapp/test")}
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
