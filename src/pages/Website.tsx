import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-10 py-3 treansticky top-0 w-screen h-auto ">
      <h1 className="flex gap-3 items-center">
        <p className="rounded-full h-12 w-12 overflow-hidden border-2 border-white">
          <img src="src/assets/coins.png" alt="logo" className="object-cover" />
        </p>
        <span className="text-3xl font-bold text-white tracking-wider shadow-lg">
          Finance Tracker
        </span>
      </h1>
      <div className="flex gap-5">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 hover:shadow-lg hover:scale-105 transform transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
function Website() {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-400 gap-16">
      <Navbar />
      <div className="flex gap-2 justify-around">
        <p className="bg-slate-700 h-80 w-70">
          Take Control of Your Finances and Investments with Ease
        </p>
        <div className="bg-slate-700 min-h-80 min-w-72 border-black border-2"></div>
      </div>
    </div>
  );
}

export default Website;
