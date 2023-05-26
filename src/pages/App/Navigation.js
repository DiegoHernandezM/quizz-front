import React from "react";
import { withTheme } from "@emotion/react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import {
  Quiz as QuizIcon,
  Subject as SubjectIcon,
  Checklist as CheckListIcon,
} from "@mui/icons-material";

const NavbarSimple = ({ onDrawerToggle }) => {
  return (
    <Box
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, width: "100%" }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction label="Materias" icon={<SubjectIcon />} />
        <BottomNavigationAction label="Test Simulacro" icon={<QuizIcon />} />
        <BottomNavigationAction
          label="Progreso y Resultados"
          icon={<CheckListIcon />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default withTheme(NavbarSimple);
