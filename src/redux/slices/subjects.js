import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  allSubjects: [],
  subject: {},
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    setSubjects(state, payload) {
      state.allSubjects = payload.payload.data;
      state.isLoading = false;
    },
    setSubject(state, payload) {
        state.subject = payload.payload.data;
        state.isLoading = false;
      },
    hasError(state, payload) {
      console.log(payload);
    },
  },
});

export default slice.reducer;

export function getSubjects() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/subject/list`);
      dispatch(slice.actions.setSubjects(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getSubject(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/subject/find/${id}`);
      dispatch(slice.actions.setSubject(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function create(values) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/subject/create`, {
        name: values.name
      });
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function update(id, values) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/subject/update/${id}`, {
        name: values.name
      });
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function getDeleteSubject(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/subject/delete/${id}`);
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function getRestoreSubject(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/subject/restore/${id}`);
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}
