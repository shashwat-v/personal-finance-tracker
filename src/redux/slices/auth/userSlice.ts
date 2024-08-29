import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("userState");
    if (serializedState) {
      return JSON.parse(serializedState);
    }
  } catch (err) {
    console.error("Failed to load state from localStorage", err);
  }
  return {
    currentUser: null,
    loading: false,
    isAuthenticated: false,
    error: null,
  };
};

const initialState = loadState();

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("userState", serializedState);
  } catch (err) {
    console.error("Failed to save state to localStorage", err);
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginInStart: (state) => {
      state.currentUser = null;
      state.loading = true;
      state.error = null;
    },
    loginInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      saveState(state); // Save state to localStorage
    },
    loginInFailure: (state, action: PayloadAction<any>) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      saveState(state);
    },
    logOut: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      saveState(state);
    },
    signUpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = true;
      saveState(state);
    },
    signUpFailure: (state, action: PayloadAction<any>) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      saveState(state);
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
