import React from "react";
import Navbar from "../component/Navbar";
import PinCard from "../component/PinCard";
import { PinData } from "../context/PinProvider";

const Home = () => {
  const { pin, loading } = PinData();

  return (
    <div className="">
      <Navbar />
      <div className="max-w-[1260px] px-4 grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 gap-3 md:py-10 py-5 mx-auto ">
        {pin.map((item, index) => (
          <PinCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
