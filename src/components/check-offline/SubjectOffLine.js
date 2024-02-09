import React, {useEffect} from "react";
import { Detector } from "react-detect-offline";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography as MuiTypography} from "@mui/material";
import createEmotionCache from "../../utils/createEmotionCache";
import { useTheme } from "@emotion/react";
import {HOST_API} from "../../config";
import {useNavigate} from "react-router-dom";
import styled from "@emotion/styled";
const clientSideEmotionCache = createEmotionCache();
const SubjectOffLine = (props, emotionCache = clientSideEmotionCache ) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleStartTest = (subjectId = null) => {
    if (subjectId == null) {
      navigate(`/dashboardapp/test`);
    } else {
      navigate(`/dashboardapp/test?subject_id=${subjectId}`);
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
    <>
      <Detector
        render={({online}) =>
          online ?
            (props.children) : (
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
                    background: `${props.color}`,
                  }}
                >
                  <CardMedia
                    sx={{ height: 160 }}
                    image={
                      props.subjectImage !== null
                        ? `${HOST_API}/images/${props.subjectImage}`
                        : `${HOST_API}/images/default.png`
                    }
                    title="subject"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {props.subjectName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {props.numberOfQuestions} preguntas.{" "}
                      {props.latestUserTest &&
                        props.latestUserTest.percentage != null &&
                        props.latestUserTest.percentage < 100 && (
                          <font color="blue">Progreso: {props.latestUserTest.percentage}%</font>
                        )}
                      {props.latestUserTest &&
                        props.latestUserTest.percentage != null &&
                        props.latestUserTest.percentage == 100 && (
                          <font color="green">Completado!</font>
                        )}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleStartTest(props.subjectId)}
                    >
                      Comenzar Test
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            )
        }
      />
    </>
  );
}

export default SubjectOffLine;