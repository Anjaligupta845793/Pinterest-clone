import React, { useState } from "react";
import { GrPinterest } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../component/Loader";
import { userData } from "../context/UserProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { LoginUser, btnLoading } = userData();
  const SubmitHander = (e) => {
    e.preventDefault();
    console.log(email, password);

    LoginUser(email, password, navigate);
  };
  return (
    <div className="md:py-10 py-50 h-screen bg-gray-400 ">
      <div className="max-w-[500px] mx-auto px-3">
        <div className="bg-white flex flex-col justify-center text-center py-5 px-8 rounded-lg">
          <GrPinterest className="mx-auto text-red-500 mt-5" size={40} />
          <h1 className="text-black text-3xl mt-5 mb-8 font-semibold">
            Log in to see more
          </h1>
          <form onSubmit={SubmitHander} className="flex flex-col">
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
              {btnLoading ? <Loader /> : "Login"}
            </button>
          </form>

          <div className="flex items-center gap-2 mt-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-600 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="mt-2">
            Not on pinterest yet?{" "}
            <span className="text-black font-bold ">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
