import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlaidState {
  linkToken: string | null;
  accessToken: string | null;
  isRegistered: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PlaidState = {
  linkToken: null,
  accessToken: null,
  isRegistered: true,
  status: "idle",
  error: null,
};

const plaidSlice = createSlice({
  name: "plaid",
  initialState,
  reducers: {
    setLinkToken(state, action: PayloadAction<string>) {
      state.linkToken = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isRegistered = true;
    },
    setStatus(
      state,
      action: PayloadAction<"idle" | "loading" | "succeeded" | "failed">
    ) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLinkToken, setAccessToken, setStatus, setError } =
  plaidSlice.actions;

export default plaidSlice.reducer;
