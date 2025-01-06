import React, { useState } from "react";
import { PinData } from "../context/PinProvider";

const CreateInput = () => {
  const [name, setname] = useState("");
  const [discription, setdiscription] = useState("");
  const [file, setfile] = useState(null);

  const filehandler = (e) => {
    setfile(e.target.files[0]);
  };

  return (
    <div>
      <div className="max-w-[1260px] mx-auto px-4 py-20 ">
        <div className="mx-auto flex md:flex-row flex-col max-w-[900px] gap-5">
          <div className="pt-20">
            <input type="file" onChange={filehandler} />
            <input
              type="text"
              className="common-input"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              className="common-input"
              value={discription}
              onChange={(e) => setdiscription(e.target.value)}
            />
            <button
              onClick={() => CreatePinHandler(name, discription, file)}
              className="bg-red-300 p-2 rounded-lg  my-2"
            >
              Create
            </button>
          </div>
          <div>
            {file && (
              <img
                src={URL.createObjectURL(file)} // Generate a URL for the selected file
                alt="Selected"
                className="w-[300px] h-[300px] object-cover" // Optional styling
              />
            )}
            <p>{name}</p>
            <p>{discription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInput;
