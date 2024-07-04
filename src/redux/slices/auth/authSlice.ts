import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions"; // Assume registerUser is a thunk action
// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

// Define the interface for the initial state
interface InitialStateTypes {
  loading: boolean;
  userInfo: object | null; // It's better to start with null instead of an empty object
  userToken: string; // for storing the JWT
  error: string | null; // Allow for null values to indicate no error
  success: boolean; // for monitoring the registration process
}

// Initialize the state with default values
const initialState: InitialStateTypes = {
  loading: false,
  userInfo: null, // Set initial userInfo to null
  userToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", // for storing the JWT
  error: null, // Set initial error to null
  success: false, // for monitoring the registration process
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // You can define additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any existing error
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true; // Indicate successful registration
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
        // Ensure the error is a string
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.userToken = action.payload.userToken;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        }
        // Ensure the error is a string
      });
  },
});

export type { InitialStateTypes };
export default authSlice.reducer;
