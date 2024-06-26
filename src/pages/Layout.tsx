import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Sidebar } from "../components/index";
function Layout() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/6 h-screen bg-[#EEEDEB] sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      <div className="absolute top-3 right-5 ">
        <span className="text-[30px]">
          <FaUserCircle />
        </span>
      </div>
    </div>
  );
}

export default Layout;
