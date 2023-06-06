import React from "react";
import { withTheme } from "@emotion/react";

import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

import {
  Quiz as QuizIcon,
  Subject as SubjectIcon,
  Checklist as CheckListIcon,
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
          label="Materias"
          icon={<SubjectIcon />}
          onClick={() => navigate("/app")}
        />
        <BottomNavigationAction
          label="Test Simulacro"
          icon={<QuizIcon />}
          onClick={() => navigate("/app/test")}
        />
        <BottomNavigationAction
          label="Progreso y Resultados"
          icon={<CheckListIcon />}
          onClick={() => navigate("/app/results")}
        />
      </BottomNavigation>
    </Box>
  );
};

export default withTheme(NavbarSimple);
