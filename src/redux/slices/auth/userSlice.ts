import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  isAuthenticated: true,
  token: null,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginInStart: (state) => {
      console.log("loginInStart:", current(state));
      state.currentUser = null;
      state.loading = true;
      state.error = null;
    },
    loginInSuccess: (state, action) => {
      console.log("loginInSuccess (before):", current(state));
      state.currentUser = action.payload;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      console.log("loginInSuccess (after):", current(state));
    },
    loginInFailure: (state, action) => {
      console.log("loginInFailure:", current(state));
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logOut: (state) => {
      console.log("logOut:", current(state));
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
    signUpStart: (state) => {
      console.log("signUpStart:", current(state));
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      console.log("signUpSuccess (before):", current(state));
      state.currentUser = action.payload;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      console.log("signUpSuccess (after):", current(state));
    },
    signUpFailure: (state, action) => {
      console.log("signUpFailure:", current(state));
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginInFailure,
  loginInStart,
  loginInSuccess,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
