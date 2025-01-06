import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-5 h-5 rounded-full border border-solid border-gray-200"></div>
      <div className="w-5 h-5 rounded-full animate-spin border border-solid border-cyan-500 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
