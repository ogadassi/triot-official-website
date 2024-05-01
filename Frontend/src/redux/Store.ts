import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducersContainer } from "./AuthSlice";

export const appStore = configureStore<AppState>({
  reducer: {
    user: authReducersContainer,
  },
});
