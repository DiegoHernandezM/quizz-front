import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { HOST_API } from "../../config";

const initialState = {
  loading: false,
  error: false,
  content: {},
};

const slice = createSlice({
  name: "landing",
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
    getContentSuccess(state, action) {
      state.loading = false;
      state.content = action.payload;
      state.error = false;
    },
  },
});

export default slice.reducer;

export function getContent() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${HOST_API}/api/landing-content`);
      dispatch(slice.actions.getContentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateContent(values, video) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("title", values.title);
      formData.append("subtitle", values.subtitle);
      formData.append("principal_text", values.principal_text);
      formData.append("footer_title", values.footer_title);
      formData.append("subscribe_button", values.subscribe_button);
      formData.append("compatible_text", values.compatible_text);
      formData.append("login_link_text", values.login_link_text);
      formData.append("footer_text_1", values.footer_text_1);
      formData.append("footer_text_2", values.footer_text_2);
      formData.append("footer_text_3", values.footer_text_3);
      formData.append("footer_text_4", values.footer_text_4);
      formData.append("ws_number", values.ws_number);

      const response = await axios.post(
        `/api/landing-content/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return Promise.resolve(response);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      return Promise.resolve(error);
    }
  };
}
