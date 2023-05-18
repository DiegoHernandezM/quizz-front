import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import counterReducer from "./slices/counter";
import usersReducer from "./slices/users";
import questionsReducer from "./slices/questions";

export const store = configureStore(
  {
    reducer: {
      users: usersReducer,
      questions: questionsReducer,
      counter: counterReducer,
    },
  },
  composeWithDevTools()
);
