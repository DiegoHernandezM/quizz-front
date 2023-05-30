import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import moment from "moment";

const initialState = {
  loading: false,
  error: false,
  users: [],
  user: {},
  stats: [],
  dataBarChart: [],
  dataLinearChart: [],
};

const slice = createSlice({
  name: "dashboard",
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
      state.user.forEach((v, k, a) => {
        a[k].id = k;
      });
      state.error = false;
    },
    getStatsSuccess(state, action) {
      state.loading = false;
      state.stats = action.payload;
      state.error = false;
    },
    getBarChartSuccess(state, action) {
      state.loading = false;
      state.dataBarChart = action.payload;
      state.error = false;
    },
    getLinearChartSuccess(state, action) {
      state.loading = false;
      state.dataLinearChart = action.payload;
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
      const response = await axios.get(
        `/api/dashboard/user/all`
      );
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading);
    try {
      const response = await axios.get(
        `/api/dashboard/userprogress/${id}`
      );
      dispatch(slice.actions.getUserSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStats() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/dashboard/stats`);
      dispatch(slice.actions.getStatsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDataBarChart() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/dashboard/barchart`);
      dispatch(slice.actions.getBarChartSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getDataLinearChart(date) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/api/dashboard/linearchart`, {
        date: moment(date).format("YYYY-MM-DD"),
      });
      dispatch(slice.actions.getLinearChartSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
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
