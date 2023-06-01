import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import Question from "./Question";

import { getUserTest, saveAnswer } from "../../redux/slices/usertests";
import { useFormik } from "formik";
import { LinearProgress, Paper } from "@mui/material";

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
    console.log(formik.values);
    formik.setFieldValue(parseInt(name), value);
    dispatch(
      saveAnswer({
        user_test_id: userTest.id,
        question_id: name,
        answer: value,
      })
    );
  };

  return (
    <React.Fragment>
      <Paper sx={{ padding: "12px" }}>
        <h1>{`Test de ${subject.name}`}</h1>
        <LinearProgress variant="determinate" value={userTest.percentage} />
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
              handleChange={handleSaveAnswer}
              showAnswer={userTest.completed}
            />
          ))}
        </form>
      </Paper>

      <Navigation />
    </React.Fragment>
  );
}

export default Tests;
