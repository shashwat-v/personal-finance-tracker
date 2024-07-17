import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlaidState {
  linkToken: string | null;
  accessToken: string | null;
  isRegistered: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  accounts: any[];
  transactions: any[];
}

const initialState: PlaidState = {
  linkToken: null,
  accessToken: null,
  isRegistered: true,
  status: "idle",
  error: null,
  accounts: [],
  transactions: [],
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
    setAccounts(state, action: PayloadAction<any[]>) {
      state.accounts = action.payload;
    },
    setTransactions(state, action: PayloadAction<any[]>) {
      state.transactions = action.payload;
    },
    setIsRegistered(state, action: PayloadAction<boolean>) {
      state.isRegistered = action.payload;
    },
  },
});

export const {
  setLinkToken,
  setAccessToken,
  setStatus,
  setError,
  setAccounts,
  setTransactions,
  setIsRegistered,
} = plaidSlice.actions;

export default plaidSlice.reducer;
