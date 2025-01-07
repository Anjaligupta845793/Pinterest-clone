import React from "react";
import { Link } from "react-router-dom";
import { userData } from "../context/UserProvider";

const Navbar = () => {
  const { user } = userData();

  return (
    <div className="bg-gray-100 shadow-md">
      <div className="max-w-[1260px] mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-red-500 font-bold text-3xl cursor-pointer">
            Pinterest
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-6 text-gray-700 font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-red-500 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/Create"
              className="hover:text-red-500 transition duration-300 ease-in-out"
            >
              Create
            </Link>
          </li>
          <li>
            <Link to="/Profile">
              <div className="bg-gray-400 text-black rounded-full w-10 h-10 flex items-center justify-center hover:opacity-80 transition duration-300 ease-in-out">
                {user?.name ? user.name.charAt(0).toUpperCase() : "P"}
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
