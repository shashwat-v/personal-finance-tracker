import { MdSettings } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { TbReceiptRupee } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineStock } from "react-icons/ai";
import { LuGoal } from "react-icons/lu";
import { TbReportSearch } from "react-icons/tb";
const linkdata = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <GoHome />,
  },
  {
    label: "Budget",
    link: "budget",
    icon: <TbReceiptRupee />,
  },
  {
    label: "Expenses",
    link: "expense",
    icon: <GiMoneyStack />,
  },
  {
    label: "Investments",
    link: "investment",
    icon: <AiOutlineStock />,
  },
  {
    label: "Goals",
    link: "goals",
    icon: <LuGoal />,
  },
  {
    label: "Report",
    link: "report",
    icon: <TbReportSearch />,
  },
];

function Sidebar() {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-3 items-center justify-center">
        <p className="rounded h-10 w-10">
          <img src="src\assets\coins.png" alt="logo" />
        </p>
        <span className="text-xl">Finance Tracker</span>
      </h1>
      <div className="flex-1 flex flex-col gap-y-6 py-8">
        {linkdata.map((data, index) => (
          <h1
            key={index}
            className="flex gap-3 items-center px-3 py-1   rounded-full text-[#2e335b] font-semibold hover:bg-slate-400"
          >
            <span className="text-[25px] font-bold">{data.icon}</span>
            <span className="text-[20px] ">{data.label}</span>
          </h1>
        ))}
      </div>
      <div className="">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <span className="text-[25px]">
            <MdSettings />
          </span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
