import React, { useState } from "react";
import { PinData } from "../context/PinProvider";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const CreateInput = () => {
  const [name, setname] = useState("");
  const [discription, setdiscription] = useState("");
  const [file, setfile] = useState(null);
  const navigate = useNavigate();

  const filehandler = (e) => {
    setfile(e.target.files[0]);
  };

  const { btnLoading, CreatePinHandler } = PinData();

  return (
    <div>
      <div className="max-w-[1260px] mx-auto px-4 py-20">
        <div className="mx-auto flex flex-col md:flex-row max-w-[900px] gap-8 items-center md:items-start">
          {/* Form Section */}
          <div className="w-full md:w-1/2">
            <form className="space-y-6">
              {/* File Input */}
              <div>
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Image
                </label>
                <input
                  id="file-input"
                  type="file"
                  onChange={filehandler}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 hover:file:bg-gray-200"
                />
              </div>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="name-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  className="common-input w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <input
                  id="description-input"
                  type="text"
                  className="common-input w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500"
                  value={discription}
                  onChange={(e) => setdiscription(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="button"
                  onClick={() =>
                    CreatePinHandler(name, discription, file, navigate)
                  }
                  className="bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={btnLoading}
                >
                  {btnLoading ? <Loader /> : "Create"}
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-[300px] h-[300px] object-cover rounded-lg shadow-md"
              />
            )}
            {name && (
              <p className="mt-4 text-lg font-semibold text-gray-800">
                Name: {name}
              </p>
            )}
            {discription && (
              <p className="mt-2 text-gray-600">Description: {discription}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInput;
