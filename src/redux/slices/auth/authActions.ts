import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Use environment variable for the backend URL
const backendURL = "http://127.0.0.1:5000"; //process.env.BACKEND_URL ||

// Type for the thunk's argument
interface RegisterUserArgs {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// Type for the API response
interface UserData {
  id: string;
  firstName: string;
  email: string;
  // Include other relevant fields from the response
}

// Type for the error response
interface ErrorResponse {
  message: string;
  // Include other relevant fields if any
}

// Create the async thunk with explicit return type and argument type
export const registerUser = createAsyncThunk<
  UserData, // The type returned by the fulfilled action
  RegisterUserArgs, // The type of the argument taken by the thunk
  {
    rejectValue: ErrorResponse; // The type returned by the rejected action
  }
>(
  "auth/register",
  async (
    { fullname, email, phoneNumber, password }: RegisterUserArgs,
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json", //tells serverand client that req and res wil be in json format
        },
      };

      const response = await axios.post<UserData>(
        `${backendURL}/api/user/register`,
        { fullname, email, phoneNumber, password },
        config
      );

      // Return the user data from the API response
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          return rejectWithValue({ message: error.response.data.message });
        }
      }
      return rejectWithValue({
        message: error.message || "An unexpected error occurred",
      });
    }
  }
);

// Type for the thunk's argument
interface LoginUserArgs {
  email: string;
  password: string;
}

// Type for the API response
interface UserData {
  userToken: string;
  // Add other relevant fields from the response
}

// Create the async thunk with explicit return type and argument type
export const userLogin = createAsyncThunk<
  UserData, // The type returned by the fulfilled action
  LoginUserArgs, // The type of the argument taken by the thunk
  {
    rejectValue: string; // The type returned by the rejected action
  }
>(
  "auth/login",
  async ({ email, password }: LoginUserArgs, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post<UserData>(
        `${backendURL}/api/user/login`,
        { email, password },
        config
      );

      // Store user's token in local storage
      localStorage.setItem("userToken", data.userToken);
      console.log(data);

      return data;
    } catch (error: any) {
      // Return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
