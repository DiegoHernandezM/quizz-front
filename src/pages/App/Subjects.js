/* eslint-disable no-octal-escape */
/* eslint-disable jsx-a11y/img-redundant-alt */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography as MuiTypography,
  Button,
  CardMedia
} from "@mui/material";

import { useTheme } from "@emotion/react";
import { HOST_API } from "../../config";


export default function SubjectCard({
  subjectName,
  subjectImage,
  subjectId,
  numberOfQuestions,
  latestUserTest,
  color,
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleStartTest = (subjectId = null) => {
    if (subjectId == null) {
      navigate(`/dashboardapp/test`);
      return;
    } else {
      navigate(`/dashboardapp/test?subject_id=${subjectId}`);
      return;
    }
  };

  const fontColor =
    theme.palette.mode === "light"
      ? theme.palette.primary.light
      : theme.palette.primary.dark;

  const Typography = styled(MuiTypography)`
    color: ${fontColor};
  `;

  return (
    <Box
      sx={{
        minHeight: 250,
        marginBottom: 5,
        color:
          theme.palette.mode === "light"
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
      }}
    >
      <Card
        sx={{
          minHeight: 250,
          boxShadow: "2px 3px 9px #203764",
          background: `${color}`,
        }}
      >
        <CardMedia
          sx={{ height: 160 }}
          image={
            subjectImage !== null
              ? `${HOST_API}/images/${subjectImage}`
              : `${HOST_API}/images/default.png`
          }
          title="subject"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {subjectName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {numberOfQuestions} preguntas.{" "}
            {latestUserTest &&
              latestUserTest.percentage != null &&
              latestUserTest.percentage < 100 && (
                <font color="blue">Progreso: {latestUserTest.percentage}%</font>
              )}
            {latestUserTest &&
              latestUserTest.percentage != null &&
              latestUserTest.percentage == 100 && (
                <font color="green">Completado!</font>
              )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleStartTest(subjectId)}
          >
            Comenzar Test
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
