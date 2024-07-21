import PieChart from "../components/PieChart";
import Account from "../components/Account";
import PlaidComp from "../components/PlaidComp";
import Modal from "../components/Modal";
function Dashboard() {
  return (
    <div className="flex">
      <div className=" h-auto w-[400px] rounded-xl border-[#EEEDEB] text-[#2E335B] border-2 flex flex-col items-center gap-2">
        <h1 className="text-3xl self-center m-2">Asset Allocation</h1>
        <div>
          <PieChart />
        </div>
      </div>
      <div className="flex-1 border-[#EEEDEB] text-[#2E335B] border-solid border-2 rounded-lg mx-4">
        <PlaidComp />
        {/* <Account /> */}
      </div>
    </div>
  );
}

export default Dashboard;
