import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  user: {},
  error: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, payload) {
      state.user = payload.payload.user;
    },
    setUsers(state, payload) {
      state.users = payload.payload;
    },
    hasError(state, payload) {
      console.log(payload);
    },
  },
});

export default slice.reducer;

export function createUser(values) {
  return async (dispatch) => {
    console.log("entro en createUser");
    try {
      const response = await axios.post(`http://quizz.test/api/user/create`, {
        name: values.fullName,
        school: values.school,
        password: values.password,
        email: values.email,
        type: values.type,
      });
      dispatch(slice.actions.setUser(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function allUsers() {
  return async (dispatch) => {
    console.log("entro en all users");
    try {
      const response = await axios.get(`http://quizz.test/api/user/all`);
      dispatch(slice.actions.setUsers(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}