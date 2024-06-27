import React from "react";
import PieChart from "../components/PieChart";
function Dashboard() {
  console.log("helo");
  return (
    <div className="flex">
      <div className=" h-[600px] w-[400px] rounded-xl border-[#EEEDEB] text-[#2E335B] border-2 flex flex-col items-center">
        <h1 className="text-2xl self-center m-2">Total Assets:</h1>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
