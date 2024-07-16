import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlaidLink } from "react-plaid-link";
import axios from "axios";
import {
  setLinkToken,
  setAccessToken,
  setStatus,
  setError,
  setAccounts,
  setTransactions,
} from "../redux/slices/plaidslice";
import { RootState, AppDispatch } from "../redux/store";
import Account from "./Account";

const PlaidComp: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { linkToken, isRegistered, status, error, accounts, transactions } =
    useSelector((state: RootState) => state.plaid);
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        dispatch(setStatus("loading"));
        if (currentUser && currentUser._id) {
          const response = await axios.post(
            "http://localhost:3000/api/user/create_link_token",
            {
              userId: currentUser._id,
            }
          );
          dispatch(setLinkToken(response.data.link_token));
          dispatch(setStatus("succeeded"));
        }
      } catch (err) {
        dispatch(setError("Failed to create link token"));
        dispatch(setStatus("failed"));
      }
    };

    if (status === "idle") {
      fetchLinkToken();
    }
  }, [status, dispatch, currentUser]);

  const handleOnSuccess = async (public_token: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/get_access_token",
        { public_token }
      );
      const accessToken = response.data.accessToken;
      dispatch(setAccessToken(accessToken));

      // Fetch account balances and transactions
      const accountsResponse = await axios.post(
        "http://localhost:3000/api/user/accounts",
        { accessToken }
      );
      dispatch(setAccounts(accountsResponse.data.accounts));
      console.log(accountsResponse);

      const transactionsResponse = await axios.post(
        "http://localhost:3000/api/user/transactions",
        {
          accessToken,
          startDate: "2023-01-01",
          endDate: "2023-12-31", // Adjust dates as necessary
        }
      );
      dispatch(setTransactions(transactionsResponse.data.transactions));
    } catch (err) {
      dispatch(setError("Failed to get access token"));
    }
  };

  return (
    <div>
      {!isRegistered ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4">Plaid</h1>
          <p className="text-gray-700 mb-4">
            Connect your Bank Account to view Balance and last few transactions
          </p>
          {linkToken ? (
            <PlaidLink
              token={linkToken}
              onSuccess={handleOnSuccess}
              onExit={(error, metadata) =>
                console.log("Plaid Link exited:", error, metadata)
              }
              className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Launch Link
            </PlaidLink>
          ) : (
            <p>Loading...</p>
          )}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <Account />
      )}
    </div>
  );
};

export default PlaidComp;
