import React from "react";
import Card from "./Card";
import { MdAccountBalanceWallet } from "react-icons/md";
import transactions from "../assets/transaction";

function Account() {
  return (
    <div className="flex flex-col m-3 gap-2 text-[#2E335B]">
      <h1 className="self-center text-3xl">Account Information</h1>
      {/* row */}
      <div className="flex gap-3">
        <div>
          <Card />
        </div>
        <div className="flex flex-col border-2 border-gray-200 rounded-lg p-3">
          <MdAccountBalanceWallet className="text-[45px]" />
          <h1 className="text-center text-xl font-medium py-2">
            Account Balance
          </h1>
          <h2 className="text-2xl font-bold ">
            <span>₹10000</span>
          </h2>
        </div>
      </div>
      {/* col */}
      <div>
        <h1 className="text-xl">Recent Transactions</h1>
        <div className="overflow-auto flex flex-col gap-1">
          {transactions.map((trans, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-2"
              >
                <div className="flex items-center gap-2">
                  <h1>{trans.category}</h1>
                </div>
                <h1>{trans.date}</h1>
                <h1 className="font-bold">{trans.amount}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Account;
