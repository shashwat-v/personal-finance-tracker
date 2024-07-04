// store.ts

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import { authApi } from "./slices/auth/authService";
// Root state type
export interface RootState {
  auth: ReturnType<typeof authReducer>;
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export default store;
