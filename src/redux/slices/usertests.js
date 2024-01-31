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
      state.userTest.questions = payload.payload;
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
      state.userTests.forEach((u, k) => {
        state.userTests[k].questions = u.parsed;
      });
    },

    setUserAnswer(state, payload) {
      state.userTest = payload.payload;
      state.userTest.questions = payload.payload.parsed;
      state.isLoading = false;
    },
  },
});

export default slice.reducer;

async function reformUserTest(subject_id = null, getState) {
  const test = await db.infotest
    .where({
      subject_id: subject_id ? parseInt(subject_id) : 0,
      completed: 0,
    })
    .toArray();

  const subject = subject_id
    ? await db.subjects.where("id").equals(parseInt(subject_id)).toArray()
    : [{ name: "Simulacro" }];
  if (test.length > 0) {
    const questionIds = test[0].parsed.map((item) =>
      parseInt(Object.keys(item)[0])
    );
    const questions = await getQuestions(questionIds);
    const payload = { userTest: test[0], questions, subject: subject[0] };
    return Promise.resolve(payload);
  } else {
    const newTest = {
      id: 999999,
      user_id: 0,
      subject_id: parseInt(subject_id) ?? 0,
      last_key: 1,
      completed: 0,
      created_at: null,
      updated_at: null,
      percentage: 0,
      grade: 0,
    };
    if (subject_id > 0) {
      const questionsDb = await db.questions
        .where({
          subject_id: parseInt(subject_id),
        })
        .toArray();
      const parsedQuestions = questionsDb.map(({ id }) => ({ [id]: "" }));
      newTest.questions = parsedQuestions;
      newTest.parsed = parsedQuestions;
      newTest.points = parsedQuestions.length;
      const questionIds = parsedQuestions.map((item) =>
        parseInt(Object.keys(item)[0])
      );
      const questions = await getQuestions(questionIds);

      const payload = { userTest: newTest, questions, subject: subject[0] };
      console.log(payload);
      db.infotest.add(newTest);
      return Promise.resolve(payload);
    } else {
      const subjects = getState().subject.allSubjects;
      const questions = await db.questions.toArray();
    }
  }
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
        reformUserTest(subject_id, getState).then((payload) => {
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
        const test = await db.infotest
          .where({
            id: data.user_test_id ? parseInt(data.user_test_id) : 0,
            completed: 0,
          })
          .toArray();
        let dataFind = test[0].questions;
        let key = dataFind.findIndex((k) => k.hasOwnProperty(data.question_id));
        dataFind[key] = { [data.question_id]: data.answer };
        test[0].questions = dataFind;
        await db.infotest.update(data.user_test_id, test[0]);
        dispatch(slice.actions.setUserTestOffline(dataFind));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function saveAnswerOffline(data) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/usertest/saveansweroffline`,
        data
      );
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
