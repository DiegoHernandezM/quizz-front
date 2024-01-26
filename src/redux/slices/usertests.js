import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { db } from "../../database";

const initialState = {
  userTest: {},
  userTests: [],
  subject: {},
  testQuestions: [],
  onlyShow: false,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "usertests",
  initialState,
  reducers: {
    setUserTest(state, payload) {
      state.userTest = payload.payload.userTest;
      state.userTest.questions = payload.payload.userTest.parsed;
      state.subject = payload.payload.subject;
      state.testQuestions = payload.payload.questions;
      state.isLoading = false;
    },
    setUserTestOffline(state, payload) {
      state.userTest.questions = payload;
      state.isLoading = false;
    },
    showUserTest(state, payload) {
      state.userTest = payload.payload.userTest;
      state.userTest.questions = payload.payload.userTest.parsed;
      state.subject = payload.payload.subject;
      state.testQuestions = payload.payload.questions;
      state.onlyShow = true;
      state.isLoading = false;
    },
    hasError(state, payload) {
      console.log(payload);
    },

    setUserTests(state, payload) {
      state.userTests = payload.payload;
      state.isLoading = false;
    },

    setUserAnswer(state, payload) {
      state.userTest = payload.payload;
      state.userTest.questions = payload.payload.parsed;
      state.isLoading = false;
    },
  },
});

export default slice.reducer;

async function reformUserTest(subject_id = null) {
  const test = await db.infotest
    .where({
      subject_id: subject_id ? parseInt(subject_id) : 0,
      completed: 0,
    })
    .toArray();

  const questionIds = test[0].parsed.map((item) =>
    parseInt(Object.keys(item)[0])
  );
  const questions = await getQuestions(questionIds);

  const subject = subject_id
    ? await db.subjects.where("id").equals(parseInt(subject_id)).toArray()
    : [{ name: "Simulacro" }];
  const payload = { userTest: test[0], questions, subject: subject[0] };
  return Promise.resolve(payload);
}

async function getQuestions(ids) {
  const q = await db.questions.toArray();
  return q.filter((item) => ids.includes(item.id));
}

export function getUserTest(subject_id = null) {
  return async (dispatch, getState) => {
    try {
      if (getState().onlinestatus.isOnline) {
        if (!subject_id) {
          const response = await axios.get(`/api/usertest/simulation/create`);
          dispatch(slice.actions.setUserTest(response.data));
        } else {
          const response = await axios.get(
            `/api/usertest/singlesubject/create`,
            {
              params: {
                subject_id,
              },
            }
          );
          dispatch(slice.actions.setUserTest(response.data));
        }
      } else {
        reformUserTest(subject_id).then((payload) => {
          dispatch(slice.actions.setUserTest(payload));
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function resetTest(subject_id = null) {
  return async (dispatch) => {
    try {
      if (!subject_id) {
        const response = await axios.get(`/api/usertest/simulation/reset`);
        dispatch(slice.actions.setUserTest(response.data));
      } else {
        const response = await axios.get(`/api/usertest/singlesubject/reset`, {
          params: {
            subject_id,
          },
        });
        dispatch(slice.actions.setUserTest(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserTests() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/usertest/getfromuser`);
      dispatch(slice.actions.setUserTests(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setTestFromId(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/usertest/find/${id}`);
      dispatch(slice.actions.showUserTest(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveAnswer(data) {
  return async (dispatch, getState) => {
    try {
      if (getState().onlinestatus.isOnline) { 
        const response = await axios.post(`/api/usertest/saveanswer`, data);
        dispatch(slice.actions.setUserAnswer(response.data));
      } else {
        console.log(data);
        const test = await db.infotest
        .where({
        id: data.user_test_id ? parseInt(data.user_test_id) : 0,
        completed: 0,
        })
        .toArray();
      console.log(JSON.parse(test[0].questions));
      let dataFind = JSON.parse(test[0].questions);
      dataFind[data.question_id] = data.answer
      dispatch(slice.actions.setUserTestOffline(JSON.stringify(dataFind)))
      console.log(dataFind);
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveAnswerOffline(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/usertest/saveansweroffline`, data);
      dispatch(slice.actions.setUserAnswer(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function endTest(subject_id = null) {
  return async (dispatch) => {
    try {
      if (!subject_id) {
        const response = await axios.get(`/api/usertest/simulation/end`);
        dispatch(slice.actions.setUserTest(response.data));
      } else {
        const response = await axios.get(`/api/usertest/singlesubject/end`, {
          params: {
            subject_id,
          },
        });
        dispatch(slice.actions.setUserTest(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
