import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { ResponseData } from "../interfaces/types";

interface ModalProps {
  onClose: () => void;
  onDataUpdate: (data: ResponseData) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onDataUpdate }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/api/user/holdings/${inputValue}`);
      // console.log(response);
      onDataUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error submitting the authorization code:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-20">
      <div className="mt-10 flex flex-col gap-5 text-black">
        <button
          onClick={() => {
            console.log("Working");
            onClose();
          }}
          className="place-self-end text-white"
        >
          <X size={40} />
        </button>
        <div className="bg-[#EEEDEB] rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
          <h1 className="text-xl">
            Enter the Authorization Code generated from the link below:
          </h1>
          <a
            href="https://api-t1.fyers.in/api/v3/generate-authcode?client_id=DYDX2P3BXM-100&redirect_uri=https%3A%2F%2Fwww.google.com&response_type=code&state=None"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Generate Authorization Code
          </a>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the Code"
              onChange={(e) => setInputValue(e.target.value)}
              required
              className="w-64 h-12 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="submit"
              onClick={() => {
                const response = axios.post(
                  `http://localhost:3000/api/user/holdings/${inputValue}`
                );
                console.log(response);
                // onClose
              }}
              className="m-4 bg-black text-white p-3 rounded-md"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
