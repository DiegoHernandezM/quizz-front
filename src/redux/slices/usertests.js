import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  userTest: {},
  subject: {},
  testQuestions: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "usertests",
  initialState,
  reducers: {
    setUserTest(state, payload) {
      state.userTest = payload.payload.userTest;
      state.userTest.questions = JSON.parse(payload.payload.userTest.questions);
      state.subject = payload.payload.subject;
      state.testQuestions = payload.payload.questions;
      state.isLoading = false;
    },
    hasError(state, payload) {
      console.log(payload);
    },

    setUserAnswer(state, payload) {
      state.userTest = payload.payload;
      state.userTest.questions = JSON.parse(payload.payload.questions);
      state.isLoading = false;
    },
  },
});

export default slice.reducer;

export function getUserTest(subject_id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/usertest/singlesubject/create`, {
        params: {
          subject_id,
        },
      });
      dispatch(slice.actions.setUserTest(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveAnswer(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/usertest/saveanswer`, data);
      dispatch(slice.actions.setUserAnswer(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
