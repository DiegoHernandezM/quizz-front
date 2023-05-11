import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  user: {}
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, payload) {
      state.user = payload?.data.user;
    }
  }
});

export const { reducer } = slice;

export default slice;

export function createUser(values) {
  return async dispatch => {
    const response = await axios.post('/api/user/create', {
      name: values.fullName,
      school: values.school,
      password: values.password,
      email: values.email,
      type: values.type
    });
    dispatch(slice.actions.setUser(response.data));
  };
}