import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Sidebar } from "../components/index";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/6 h-screen bg-[#EEEDEB] sticky top-0 hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto m-3">
        <div className="flex flex-col gap-4">
          <span className="text-[30px] self-end">
            <FaUserCircle />
          </span>
          <div className="flex-1 p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
