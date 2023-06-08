import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import Question from "./Question";

import {
  getUserTest,
  saveAnswer,
  resetTest,
  setTestFromId,
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
  LinearProgress,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

function Tests() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const { testQuestions, userTest, subject } = useSelector(
    (state) => state.usertests
  );
  const queryParameters = new URLSearchParams(window.location.search);
  const subject_id = queryParameters.get("subject_id");
  const testId = queryParameters.get("test_id");

  useEffect(() => {
    if (testId > 0) {
      dispatch(setTestFromId(testId));
    } else {
      dispatch(getUserTest(subject_id));
    }
  }, []);

  const formik = useFormik({
    initialValues: userTest.questions,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.setValues(userTest.questions);
    setOpen(userTest.completed && testId === null);
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
  };

  return (
    <React.Fragment>
      <Paper sx={{ padding: "12px" }}>
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
            <Typography variant="h4">
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
            {testQuestions.map((question) => (
              <Question
                key={question.id}
                question={question}
                value={
                  userTest.questions[question.id]
                    ? userTest.questions[question.id]
                    : ""
                }
                disabled={userTest.questions[question.id] ? true : false}
                handleChange={handleSaveAnswer}
                showAnswer={userTest.completed}
              />
            ))}
          </form>
          <br />
          <br />
          <br />
        </Box>
      </Paper>
      <Navigation />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{ background: "white" }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h1">{"¡Test completado!"}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent style={{ background: "white" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h2">
                Tu puntaje fue de {userTest.grade} / {userTest.points} (
                {((userTest.grade * 100) / userTest.points).toFixed(2)}%)
              </Typography>
            </Box>
          </DialogContentText>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="subtitle1">
              Deseas volver a intentarlo?
            </Typography>
          </Box>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => setOpen(false)}
              color="primary"
            >
              Revisar mis respuestas
            </Button>
            <Button
              variant="contained"
              onClick={handleResetTest}
              color="primary"
            >
              Reintentar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default Tests;
