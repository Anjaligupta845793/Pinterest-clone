import React from "react";
import { Link } from "react-router-dom";

const PinCard = (item) => {
  console.log(item);
  return (
    <div className="relative group w-[200px] h-[300px] overflow-hidden rounded-lg shadow-lg mx-auto">
      {/* Image */}
      <img
        src={item.item.image.url}
        alt={item.item.name}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-red-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link to={`/Pin/${item.item._id}`}>
          <button className="px-4 py-2 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-200 transition-colors">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PinCard;
