import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questionsCatalogue: [],
  questionData: {},
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCatalogue(state, payload) {
      payload.payload.data.forEach((element, index) => {
        payload.payload.data[index].subject = element.subject?.name ?? "";
      });
      state.questionsCatalogue = payload.payload.data;
      state.isLoading = false;
    },
    setQuestion(state, payload) {
      state.questionData = payload.payload.data;
      state.isLoading = false;
    },
    hasError(state, payload) {
      console.log(payload);
    },
  },
});

export default slice.reducer;

export function getQuestionsCatalogue() {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://quizz.test/api/questions/catalogue`
      );
      dispatch(slice.actions.setCatalogue(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getQuestion(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://quizz.test/api/questions/${id}`);
      dispatch(slice.actions.setQuestion(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createQuestion(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://quizz.test/api/questions/create`,
        data
      );
      dispatch(slice.actions.setQuestion(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateQuestion(id, data) {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `http://quizz.test/api/questions/${id}`,
        data
      );
      dispatch(slice.actions.setQuestion(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteQuestion(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `http://quizz.test/api/questions/${id}`
      );
      dispatch(slice.actions.setQuestion(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function massLoad(file) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("excel", file);
      const response = await axios.post(
        `http://quizz.test/api/questions/massload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      dispatch(slice.actions.setCatalogue(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
