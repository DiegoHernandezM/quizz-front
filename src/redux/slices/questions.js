import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questionsCatalogue: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setCatalogue(state, payload) {
      state.questionsCatalogue = payload.payload.data;
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
