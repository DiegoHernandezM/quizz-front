import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {}
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, payload) {
      state.user = payload.data.user;
    }
  }
});

export default slice.reducer;

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