import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducersContainer } from "./AuthSlice";
// import { commentReducersContainer } from "./CommentSlice";

export const appStore = configureStore<AppState>({
  reducer: {
    user: authReducersContainer,
    // comments: commentReducersContainer,
  },
});
