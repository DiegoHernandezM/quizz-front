/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import Question from "./Question";

import {
  getUserTest,
  saveAnswer,
  resetTest,
  setTestFromId,
  endTest,
} from "../../redux/slices/usertests";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  LinearProgress,
  MobileStepper,
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { db } from "../../database";
import { useLiveQuery } from "dexie-react-hooks";
import { getQuestionsPreload } from "../../redux/slices/questions";
import { getLoggedUser } from "../../redux/slices/users";
import PaperPlane from "./PaperPlane";
import CustomButtons from "./CustomButtons";


function Tests() {
  const questions = useLiveQuery(() => db.questions.toArray());
  const dispatch = useDispatch();
  const { logged } = useSelector((state) => state.users);
  const [open, setOpen] = React.useState(false);
  const [explainOpen, setExplainOpen] = React.useState(false);
  const [imageOpen, setImageOpen] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const { testQuestions, userTest, subject } = useSelector(
    (state) => state.usertests
  );
  const { isOnline } = useSelector((state) => state.onlinestatus);
  const maxSteps = testQuestions.length;
  const queryParameters = new URLSearchParams(window.location.search);
  const subject_id = queryParameters.get("subject_id");
  const testId = queryParameters.get("test_id");
  const navigate = useNavigate();
  const colors = [
    "#F2F3F4",
    "#D1F2EB",
    "#E3DFFD",
    "#ECE8DD",
    "#FADBD8",
    "#E8DAEF",
    "#ECF0F1",
    "#D6EAF8",
    "#E5E7E9",
    "#EAECEE",
    "#F4ECF7",
    "#FEF9E7",
    "#E5E8E8",
  ];
  const [dataArray, setDataArray] = useState([]);
  const { signOut } = useAuth();

  useEffect(() => {
    dispatch(getLoggedUser());
    if (testId > 0) {
      dispatch(setTestFromId(testId));
    } else {
      dispatch(getUserTest(subject_id));
    }
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const formik = useFormik({
    initialValues: userTest.parsed,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.setValues(userTest.parsed);
    if (userTest.completed && testId === null) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    if (userTest.parsed) {
      let pre = userTest.parsed;
      let a = Object.keys(pre);
      let step = a.find((k) => Object.values(pre[k])[0] === "");
      if (step === undefined || step === null) {
        step = maxSteps - 1;
        setAnswered(true);
      } else {
        setAnswered(false);
        step = parseInt(step) - 1;
      }
      if (step < 0) step = 0;
      setActiveStep(step);
    }
  }, [userTest]);

  const createOrUpdateRecord = async (data) => {
    const isFirstTime = (await db.table("saveanswers").count()) === 0;
    if (isFirstTime) {
      const newRecord = { params: data };
      const id = await db.saveanswers.add(newRecord);
      console.log(`Registro creado con ID: ${id}`);
    } else {
      const records = await db.saveanswers.toArray();
      if (records.length > 0) {
        const firstRecord = records[0];
        firstRecord.user_test_id = data.user_test_id;
        firstRecord.params = data;
        await db.saveanswers.put(firstRecord);
        console.log(`Registro actualizado con ID: ${firstRecord.id}`);
      }
    }
  };
  
  const handleNav = () => {
    dispatch(checkValidateUser());
  };

  function checkValidateUser() {
      console.log('llego a validacion en funcion');
      const session = logged.session_id;
      const localSession = window.localStorage.getItem("session_id");
      return (dispatch) =>
        new Promise((resolve) => {
          resolve(dispatch(getLoggedUser()));
        })
          .then((response) => {
            console.log('llego al response then',response.status);
            if (session !== undefined && session !== localSession) {
              signOut();
            }
          })
          .catch((error) => {
            console.log('errpr', error.status);
            signOut();
          });
    }

  const handleSaveAnswer = (event) => {
    handleNav();
    const { name, value } = event.target;
    formik.setFieldValue(parseInt(name), value);
    if (isOnline) {
      dispatch(
        saveAnswer({
          user_test_id: userTest.id,
          question_id: name,
          answer: value,
        })
      );
    } else {
      const array = [...dataArray];
      array.push({
        user_test_id: userTest.id,
        question_id: name,
        answer: value,
      });
      setDataArray(array);
      if (userTest.id < 100000) {
        createOrUpdateRecord(array);
      }
      dispatch(
        saveAnswer({
          user_test_id: userTest.id,
          question_id: name,
          answer: value,
        })
      );
    }
  };

  const handleResetTest = () => {
    dispatch(resetTest(userTest.subject_id ?? null));
    setOpen(false);
  };

  const handleEndTest = () => {
    if (isOnline) {
      dispatch(endTest(userTest.subject_id ?? null)).then(() => {
        setOpen(true);
      });
    } else {
      handleEndTestOffline();
      dispatch(endTest(userTest.subject_id ?? null)).then(() => {
        setOpen(true);
      });
    }
  };

  const handleEndTestOffline = async () => {
    const newRecord = { subject_id: userTest.subject_id ?? null };
    const id = await db.endtest.add(newRecord);
    console.log(`Registro creado con ID: ${id}`);
  };

  const getColor = () => {
    const percent = (userTest.grade * 100) / userTest.points;
    return percent > 80
      ? "green"
      : percent > 70
      ? "#f4bb00"
      : percent < 70
      ? "red"
      : "red";
  };

  return (
    <React.Fragment>
      <Box sx={{ padding: "12px" }}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            padding: "6px",
            marginTop: "65px",
          }}
          elevation={3}
        >
          <Box
            component="div"
            style={{
              backgroundColor: colors[subject_id - 15] ?? "#FAFAD2",
              padding: "5px",
            }}
          >
            <h2
              style={{
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
              }}
            >
              {`Test de ${subject.name ?? ""}`}{" "}
              {userTest.completed && logged?.id == userTest.user_id ? (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleResetTest}
                  sx={{ marginLeft: "15px" }}
                >
                  Reiniciar test
                </Button>
              ) : null}
            </h2>
            {userTest.completed && testId > 0 ? (
              <Typography
                variant="h4"
                component={"span"}
                color={
                  theme.palette.mode === "light"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark
                }
              >
                Calificación: {userTest.grade} / {userTest.points} (
                {((userTest.grade * 100) / userTest.points).toFixed(2)}%)
              </Typography>
            ) : null}
            <LinearProgress
              variant="determinate"
              value={userTest.percentage ?? 0}
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "fixed",
            top: 100,
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            overflow: "scroll",
            padding: "12px",
            marginTop: "65px",
          }}
          elevation={3}
        >
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            {testQuestions.length > 0 && userTest.parsed[activeStep] ? (
              <Question
                key={testQuestions[activeStep].id}
                question={testQuestions[activeStep]}
                value={
                  Object.values(userTest.parsed[activeStep])[0]
                    ? Object.values(userTest.parsed[activeStep])[0]
                    : ""
                }
                disabled={
                  Object.values(userTest.parsed[activeStep])[0] ? true : false
                }
                handleChange={handleSaveAnswer}
                showAnswer={userTest.completed}
              />
            ) : null}
          </form>
          <Box sx={{ flexGrow: 1 }}>
            <MobileStepper
              variant="text"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Siguiente
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                  Anterior
                </Button>
              }
            />
          </Box>
          <br />
          {testQuestions[activeStep] &&
          testQuestions[activeStep].explanation ? (
            <Button
              size="small"
              variant="outlined"
              onClick={() => setExplainOpen(true)}
            >
              Mostrar explicación
            </Button>
          ) : null}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {testQuestions[activeStep] && testQuestions[activeStep].image ? (
            <Button
              size="small"
              variant="outlined"
              color="warning"
              onClick={() => setImageOpen(true)}
            >
              Mostrar imagen
            </Button>
          ) : null}
          {answered && userTest.completed === 0 ? (
            <Button
              size="small"
              variant="outlined"
              onClick={handleEndTest}
              color="error"
              sx={{ float: "right" }}
            >
              Finalizar y calificar
            </Button>
          ) : null}
        </Box>
      </Box>
      <Navigation />
      {testQuestions.length > 0 &&
      userTest?.parsed[activeStep] &&
      Object.values(userTest.parsed[activeStep])[0] !== "" ? (
        <Drawer
          PaperProps={{
            sx: {
              height: `calc(40% - 60px)`,
              backgroundColor: "GainsBoro",
              padding: "10px",
            },
          }}
          anchor="bottom"
          open={explainOpen}
          onClose={() => setExplainOpen(false)}
        >
          <Typography
            variant="h5"
            sx={{ margin: "0 auto", marginTop: "20px" }}
            component={"span"}
          >
            <Divider
              sx={{
                backgroundColor: "gold",
                padding: "2px",
                marginBottom: "4px",
              }}
            />
            <Divider
              sx={{
                backgroundColor: "gold",
                padding: "2px",
                marginBottom: "4px",
              }}
            />
            <Divider
              sx={{
                backgroundColor: "gold",
                padding: "2px",
                marginBottom: "15px",
              }}
            />
            {testQuestions[activeStep]?.explanation ?? "Sin explicación..."}
          </Typography>
        </Drawer>
      ) : null}
      {testQuestions.length > 0 ? (
        <Drawer
          PaperProps={{
            sx: {
              height: `calc(90% - 60px)`,
              backgroundColor: "GainsBoro",
              padding: "10px",
            },
          }}
          anchor="bottom"
          open={imageOpen}
          onClose={() => setImageOpen(false)}
        >
          <Typography
            variant="h5"
            sx={{ margin: "0 auto", marginTop: "20px" }}
            component={"span"}
          >
            <Divider
              sx={{
                backgroundColor: "gold",
                padding: "2px",
                marginBottom: "4px",
              }}
            />
            <Divider
              sx={{
                backgroundColor: "gold",
                padding: "2px",
                marginBottom: "4px",
              }}
            />
            <Divider
              sx={{
                backgroundColor: "gold",
                padding: "2px",
                marginBottom: "15px",
              }}
            />
            <img
              width="100%"
              src={`https://aviationimages.s3.amazonaws.com/${testQuestions[activeStep]?.image}`}
              alt=""
            />
          </Typography>
        </Drawer>
      ) : null}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            ></IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h3"
              component="div"
              onClick={() => setOpen(false)}
            >
              Aviation In InSight
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogTitle style={{ background: "white" }}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "5%" }}
          >
            <Typography color={getColor} variant="h1" component={"span"}>
              {"¡Test completado!"}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent style={{ background: "white" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              component={"span"}
            >
              <Typography variant="h2" color={getColor} component={"span"}>
                Tu puntaje fue de {userTest.grade} / {userTest.points} (
                {((userTest.grade * 100) / userTest.points).toFixed(2)}%)
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: "20px" }}
              component={"span"}
            >
              <PaperPlane
                grade={userTest.grade}
                points={userTest.points}
                color={getColor}
              />
            </Box>
          </DialogContentText>
          <CustomButtons reset={handleResetTest} close={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
export default Tests;
