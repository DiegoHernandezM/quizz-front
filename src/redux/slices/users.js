import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  users: [],
  user: {},
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    endLoading(state) {
      state.loading = false;
    },
    hasError(state) {
      state.loading = false;
      state.error = true;
    },
    getUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
      state.error = false;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    clearDataSuccess(state) {
      state.user = initialState.user;
    },
  },
});

export default slice.reducer;

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`http://quizz.test/api/user/all`);
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading)
    try {
      const response = await axios.get(`http://quizz.test/api/user/get/${id}`);
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createUser(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`http://quizz.test/api/user/create`, {
        name: values.name,
        school: values.school,
        email: values.email,
        type_id: values.type_id,
        expires_at: values.expires_at,
        password: null
      });
      dispatch(slice.actions.endLoading())
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function updateUser(id, values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`http://quizz.test/api/user/update/${id}`, {
        name: values.name,
        school: values.school,
        email: values.email,
        type_id: values.type_id,
        expires_at: values.expires_at,
      });
      dispatch(slice.actions.endLoading());
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function deleteUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`http://quizz.test/api/user/delete/${id}`);
      dispatch(slice.actions.endLoading());
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function restoreUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(
        `http://quizz.test/api/user/restore/${id}`
      );
      dispatch(slice.actions.endLoading());
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.reject(error);
    }
  };
}

export function clearDataUser() {
  return async (dispatch) => {
    try {
      dispatch(slice.actions.clearDataSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


