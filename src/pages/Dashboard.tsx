import React from "react";
import PieChart from "../components/PieChart";
function Dashboard() {
  return (
    <div className="flex">
      <div className=" h-auto w-[400px] rounded-xl border-[#EEEDEB] text-[#2E335B] border-2 flex flex-col items-center gap-2">
        <h1 className="text-2xl self-center m-2">Asset Allocation:</h1>
        <div>
          <PieChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
