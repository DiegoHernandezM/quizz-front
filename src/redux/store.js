import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import counterReducer from "./slices/counter";
import usersReducer from "./slices/users";
import questionsReducer from "./slices/questions";
import subjectsReducer from "./slices/subjects";

export const store = configureStore(
  {
    reducer: {
      users: usersReducer,
      questions: questionsReducer,
      counter: counterReducer,
      subjects: subjectsReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  },
  composeWithDevTools()
);
