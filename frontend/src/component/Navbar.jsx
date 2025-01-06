import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../context/UserProvider";

const Navbar = () => {
  const { user } = userData();
  console.log(user);
  return (
    <div className="bg-gray-200 md:py-5 py-8 ">
      <div className="max-w-[1260px] mx-auto flex justify-between px-4">
        <h1 className="text-red-500 font-bold text-2xl">Pinterest</h1>
        <ul className="flex gap-3 ">
          <Link to={"/"}>Home</Link>
          <Link to={"/Create"}>Create</Link>
          <div className="bg-gray-400 text-black rounded-full w-8 h-8 flex justify-center items-center ">
            {user.name ? user.name.slice(0, 1) : "p"}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
