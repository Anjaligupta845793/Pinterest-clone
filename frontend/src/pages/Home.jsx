import React from "react";
import Navbar from "../component/Navbar";
import PinCard from "../component/PinCard";
import { PinData } from "../context/PinProvider";

const Home = () => {
  const { pin, loading } = PinData();

  return (
    <div>
      <Navbar />
      <div className="columns-1 sm:columns-2 md:columns-4 lg:columns-5 gap-4 mx-auto p-4 max-w-[1360px]">
        {pin.map((item, index) => (
          <PinCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
