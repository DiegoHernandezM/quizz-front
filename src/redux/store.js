import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import counterReducer from "./slices/counter";
import usersReducer from "./slices/users";

export const store = configureStore(
  {
    reducer: {
      counter: counterReducer,
      users: usersReducer,
    },
  },
  composeWithDevTools()
);
