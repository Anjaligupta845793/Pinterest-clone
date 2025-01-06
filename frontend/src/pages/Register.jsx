import React from "react";
import { useState } from "react";
import { GrPinterest } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../context/UserProvider";
import Loader from "../component/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { RegisterUser, btnLoading } = userData();
  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    RegisterUser(name, email, password, navigate);
  };
  return (
    <div className="md:py-20 py-56 h-screen bg-gray-400 ">
      <div className="max-w-[500px] mx-auto px-3">
        <div className="bg-white flex flex-col justify-center text-center py-5 px-8 rounded-lg">
          <GrPinterest className="mx-auto text-red-500 mt-5" size={40} />
          <h1 className="text-black text-3xl mt-5 mb-8 font-semibold">
            Sign up to see more
          </h1>
          <form onSubmit={SubmitHandler} className="flex flex-col">
            <label htmlFor="name" className="text-left mb-2">
              Name
            </label>
            <input
              type="name"
              id="name"
              className="common-input mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="email" className="text-left mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="common-input mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="text-left mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="common-input mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="common-btn mt-4 flex justify-center items-center"
              disabled={btnLoading}
            >
              {btnLoading ? <Loader /> : "Register"}
            </button>
          </form>

          <div className="flex items-center gap-2 mt-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="mt-2">
            already have a account?{" "}
            <span className="text-black font-bold ">
              <Link to="/Login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
