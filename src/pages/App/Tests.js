import React, { useEffect } from "react";
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
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { set } from "date-fns";

function Tests() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [explainOpen, setExplainOpen] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const { testQuestions, userTest, subject } = useSelector(
    (state) => state.usertests
  );

  const maxSteps = testQuestions.length;
  const queryParameters = new URLSearchParams(window.location.search);
  const subject_id = queryParameters.get("subject_id");
  const testId = queryParameters.get("test_id");
  const navigate = useNavigate();

  useEffect(() => {
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
    initialValues: userTest.questions,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.setValues(userTest.questions);
    if (userTest.completed && testId === null) {
      setOpen(true);
    }

    if (userTest.questions) {
      let pre = userTest.questions;
      console.log(pre);
      let a = Object.keys(pre);
      let step = a.find((k) => Object.values(pre[k])[0] === "");
      console.log(step);
      if (step === undefined) {
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

  const handleSaveAnswer = (event) => {
    const { name, value } = event.target;
    formik.setFieldValue(parseInt(name), value);
    dispatch(
      saveAnswer({
        user_test_id: userTest.id,
        question_id: name,
        answer: value,
      })
    );
  };

  const handleResetTest = () => {
    dispatch(resetTest(userTest.subject_id ?? null));
    setOpen(false);
  };

  const handleEndTest = () => {
    dispatch(endTest(userTest.subject_id ?? null)).then(() => {
      setOpen(true);
    });
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
            marginTop: "45px",
          }}
          elevation={3}
        >
          <h2>
            {`Test de ${subject.name}`}{" "}
            {userTest.completed && user?.id == userTest.user_id ? (
              <Button variant="outlined" size="small" onClick={handleResetTest}>
                Reiniciar test
              </Button>
            ) : null}
          </h2>
          {userTest.completed && testId > 0 ? (
            <Typography variant="h4" component={"span"}>
              Calificación: {userTest.grade} / {userTest.points} (
              {((userTest.grade * 100) / userTest.points).toFixed(2)}%)
            </Typography>
          ) : null}
          <LinearProgress
            variant="determinate"
            value={userTest.percentage ?? 0}
          />
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
            marginTop: "45px",
          }}
          elevation={3}
        >
          <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
            {testQuestions.length > 0 ? (
              <Question
                key={testQuestions[activeStep].id}
                question={testQuestions[activeStep]}
                value={
                  Object.values(userTest.questions[activeStep])[0]
                    ? Object.values(userTest.questions[activeStep])[0]
                    : ""
                }
                disabled={
                  Object.values(userTest.questions[activeStep])[0]
                    ? true
                    : false
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
          Object.values(userTest.questions[activeStep])[0] &&
          testQuestions[activeStep].explanation ? (
            <Button
              size="small"
              variant="outlined"
              onClick={() => setExplainOpen(true)}
            >
              Mostrar explicación
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
      {testQuestions.length > 0 ? (
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
            {testQuestions[activeStep].explanation ?? "Sin explicación..."}
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
            style={{ marginTop: "15%" }}
          >
            <Typography variant="h1" component={"span"}>
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
              {(userTest.grade * 100) / userTest.points > 80 ? (
                <Typography variant="h3" color={getColor} component={"span"}>
                  Excelente trabajo capitán
                </Typography>
              ) : (userTest.grade * 100) / userTest.points > 70 ? (
                <Typography variant="h3" color={getColor} component={"span"}>
                  Sigue practicando para emprender el vuelo. Estas cerca del
                  éxito
                </Typography>
              ) : (userTest.grade * 100) / userTest.points < 70 ? (
                <Typography variant="h3" color={getColor} component={"span"}>
                  Hay que reforzar conceptos, aún estas a tiempo. Ánimo capitán
                </Typography>
              ) : null}
            </Box>
          </DialogContentText>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Typography variant="h6" component={"span"}>
              ¿Qué deseas hacer?
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Button
              variant="contained"
              onClick={() => setOpen(false)}
              color="primary"
            >
              Revisar mis respuestas
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Button
              variant="contained"
              onClick={handleResetTest}
              color="primary"
            >
              Reintentar
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: "20px" }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/dashboardapp")}
              color="primary"
            >
              Ir al inicio
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
export default Tests;
