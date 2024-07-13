import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/auth/userSlice"; // Ensure this slice manages the authentication state
import plaidslice, { PlaidState } from "./slices/plaidslice";

// Combine your slices into a root reducer
const rootReducer = combineReducers({
  user: userSlice,
  plaid: plaidslice,
});

// Configure the Redux store with the root reducer and necessary middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Define RootState type for useSelector
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
