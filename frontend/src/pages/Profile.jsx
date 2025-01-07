import React from "react";
import { userData } from "../context/UserProvider";
import { useState, useEffect } from "react";
import Loader from "../component/Loader";
import { useNavigate } from "react-router-dom";
import { PinData } from "../context/PinProvider";
import PinCard from "../component/PinCard";

import Navbar from "../component/Navbar";

const Profile = () => {
  const { user, Logout } = userData();
  const [pins, setpins] = useState([]);
  const { pin } = PinData();
  const navigate = useNavigate();
  let userPins;
  if (pin) {
    userPins = pin.filter((pin) => pin.user === user._id);
    console.log(userPins);
  }
  return (
    <>
      <div className="py-20 ">
        {user.name ? (
          <div className="max-w-[860px] text-center mx-auto ">
            <div className="p-4 flex justify-center mx-auto bg-gray-400 w-20 h-20 text-2xl font-bold mt-7 rounded-full items-center">
              {user.name.slice(0, 1)}
            </div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <button
              className="w-[100px] py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-5"
              onClick={() => Logout(navigate)}
            >
              Logout
            </button>
            <div className="">
              <div className="columns-1 sm:columns-2 md:columns-4 lg:columns-5 gap-4 mx-auto p-4 max-w-[1360px]">
                {userPins.map((item, index) => (
                  <PinCard item={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Profile;
