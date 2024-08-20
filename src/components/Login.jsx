import React from "react";
import { Link } from "react-router-dom";
import {BiUser} from 'react-icons/bi'
import {AiOutlineUnlock} from 'react-icons/ai'

function Login() {
  return (
    <div className="flex items-center justify-center bg-gray-900 ">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Login
        </h1>
        <form action="">
          <div className="relative my-4">
            <input
              type="email"
              id="email"
              name="email"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
            >
              Your Email
            </label>
            <BiUser className="absolute top-4 right-4" />
          </div>
          <div className="relative my-4">
            <input
              type="password"
              id="password"
              name="password"
              className="block w-72 py-2.5 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
            >
              Your Password
            </label>
            <AiOutlineUnlock className="absolute top-4 right-4" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-600"
              />
              <label htmlFor="remember" className="text-white ml-2">
                Remember Me
              </label>
            </div>
            <Link to="" className="text-blue-500 cursor-pointer">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-500"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-white">
              New Here?{" "}
              <Link to="/Register" className="text-blue-500">
                Create an Account
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
