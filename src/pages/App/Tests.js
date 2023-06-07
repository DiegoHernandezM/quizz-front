import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import Question from "./Question";

import {
  getUserTest,
  saveAnswer,
  resetTest,
} from "../../redux/slices/usertests";
import { useFormik } from "formik";
import { Box, Button, LinearProgress, Paper } from "@mui/material";

function Tests() {
  const dispatch = useDispatch();
  const { testQuestions, userTest, subject } = useSelector(
    (state) => state.usertests
  );
  const queryParameters = new URLSearchParams(window.location.search);
  const subject_id = queryParameters.get("subject_id");
  useEffect(() => {
    dispatch(getUserTest(subject_id));
  }, []);

  const formik = useFormik({
    initialValues: userTest.questions,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.setValues(userTest.questions);
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
            padding: "12px",
            marginTop: "45px",
          }}
          elevation={3}
        >
          <h2>
            {`Test de ${subject.name}`}{" "}
            {userTest.completed && (
              <Button variant="outlined" onClick={handleResetTest}>
                Reiniciar test
              </Button>
            )}
          </h2>

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
    </React.Fragment>
  );
}

export default Tests;
