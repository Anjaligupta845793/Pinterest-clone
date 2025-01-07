import React from "react";
import { Link } from "react-router-dom";

const PinCard = (item) => {
  return (
    <div className="relative w-full my-6">
      <div className="relative group w-full h-full">
        {/* Image will determine the height naturally */}
        <img
          src={item.item.image.url}
          alt={item.item.name}
          className="w-full h-auto object-cover rounded-lg"
        />

        {/* Overlay - positioned absolute relative to the container */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <Link to={`/Pin/${item.item._id}`}>
            <button className="px-4 py-2 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-200 transition-colors">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PinCard;
