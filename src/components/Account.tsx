import React from "react";
import Card from "./Card";
import { MdAccountBalanceWallet } from "react-icons/md";

interface AccountProps {
  transactions: any[];
}

const Account: React.FC<AccountProps> = ({ transactions = [] }) => {
  console.log("Transactions in Account component:", transactions);

  return (
    <div className="flex flex-col m-3 gap-2 text-[#2E335B]">
      <h1 className="self-center text-3xl">Account Information</h1>
      {/* row */}
      <div className="flex gap-3">
        <div>
          <Card />
        </div>
        {transactions.accounts.length > 0 && (
          <div className="flex flex-col border-2 border-gray-200 rounded-lg p-3">
            <MdAccountBalanceWallet className="text-[45px]" />
            <h1 className="text-center text-xl font-medium py-2">
              Account Balance
            </h1>
            <h2 className="text-2xl font-bold">
              <span>{transactions.accounts[0].balances.current}</span>
            </h2>
          </div>
        )}
      </div>
      {/* col */}
      <div className="pt-4">
        <h1 className="text-xl">Recent Transactions</h1>
        <div className="overflow-auto flex flex-col gap-1 h-60 overflow-y-scroll no-scrollbar">
          {transactions.added.map((trans, index) => (
            <div
              key={index}
              className="flex flex-col border-b border-gray-200 py-2.5"
            >
              <div className="flex justify-between items-center">
                <h1 className="text-center">
                  {trans.category[0].split(" ")[0]}
                </h1>
                <h1 className="flex-grow text-center">{trans.date}</h1>
                <h1 className="font-bold">{trans.amount}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
