import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PinData } from "../context/PinProvider";
import FullLoader from "./FullLoader";
import Navbar from "./Navbar";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const PinDetails = () => {
  const [Pin, setPin] = useState({});
  const { id } = useParams();
  const { SinglePin } = PinData();

  useEffect(() => {
    const pin = SinglePin(id)
      .then((pin) => setPin(pin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      {Pin.image ? (
        <div className="py-20 w-full">
          <div className="max-w-[1200px] mx-auto flex md:flex-row flex-col gap-10 px-6 ">
            <img src={Pin.image.url} alt="" className="h-[400px] w-[300px]" />
            <div className="w-full px-5">
              <div className="flex justify-between">
                <p className="font-bold text-2xl">{Pin.name}</p>
                <FaRegEdit size={20} />
                <MdDelete size={20} />
              </div>
              <p className="my-4">{Pin.discription}</p>
              <div className="flex gap-2 my-5 border-b-[1px] py-2 border-gray-400 w-full">
                <div className="w-9 h-9  p-2 bg-gray-400 items-center flex justify-center mt-2 rounded-full">
                  {Pin.name.slice(0, 1)}
                </div>
                <div className="     ">
                  <p>{Pin.name}</p>
                  <p>{`${Pin?.followers?.length || 0} follower${
                    Pin?.followers?.length === 1 ? "" : "s"
                  }`}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-9 h-9  p-2 bg-gray-400 items-center flex justify-center mt-2 rounded-full">
                  {Pin.name.slice(0, 1)}
                </div>
                <input type="text" className="common-input " />
                <button className="w-[100px] py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Add+
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FullLoader />
      )}
    </div>
  );
};

export default PinDetails;
