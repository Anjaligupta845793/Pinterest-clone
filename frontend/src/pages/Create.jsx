import React from "react";
import { useNavigate } from "react-router-dom";
import CreateInput from "../component/CreateInput";
import Navbar from "../component/Navbar";

const Create = () => {
  return (
    <div>
      <Navbar />
      <CreateInput />
    </div>
  );
};

export default Create;
