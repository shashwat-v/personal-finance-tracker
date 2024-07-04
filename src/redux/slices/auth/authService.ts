import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";

// Define type for user data
interface UserData {
  id: string;
  firstName: string;
  email: string;
  // Add other relevant fields from the response
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    // Base URL of backend API
    baseUrl: "http://127.0.0.1:5000/",
    // `prepareHeaders` is used to configure the header of every request and gives access to `getState`,
    // which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.userToken;
      if (token) {
        // Include token in request header
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<UserData, void>({
      query: () => ({
        url: "api/user/profile",
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi;

// Type definition for the useGetUserDetailsQuery hook result
type UseGetUserDetailsQueryResult = {
  data: UserData | undefined;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
};

// Adjusting the type of useGetUserDetailsQuery to match expected result
export const useGetUserDetailsQueryTyped = (): UseGetUserDetailsQueryResult =>
  useGetUserDetailsQuery();
