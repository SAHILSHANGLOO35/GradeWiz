import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import axios from "axios";

function Login() {
  const [userType, setUserType] = useState("user"); // Default user type
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      "http://127.0.0.1:8000/api/v1/user/signin"


    try {
      const response = await axios.post(url, formData);
      const { token } = response.data; // Get token from response
      localStorage.setItem("token", token); // Save token to local storage

      // Set isAdmin based on user type
      localStorage.setItem("isAdmin", userType === "admin");

      navigate("/teams"); // Redirect to home page
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
        <div className="bg-white border border-slate-300 rounded-xl p-16 shadow-xl backdrop-filter backdrop-blur-sm bg-opacity-70 relative w-full max-w-lg">
          <h1 className="text-4xl text-sky-900 font-bold text-center mb-8">
            Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-6">
              <label className="transition duration-500 ease-in-out hover:text-blue-500">
                <input
                  type="radio"
                  value="user"
                  checked={userType === "user"}
                  onChange={() => setUserType("user")}
                  className="mr-2"
                />
                User
              </label>
              <label className="transition duration-500 ease-in-out hover:text-blue-500">
                <input
                  type="radio" a
                  value="admin"
                  checked={userType === "admin"}
                  onChange={() => setUserType("admin")}
                  className="mr-2"
                />
                Faculty
              </label>
            </div>
            <div className="relative my-6">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
              >
                Your Email
              </label>
              <BiUser className="absolute top-4 right-4 text-gray-400 text-xl" />
            </div>
            <div className="relative my-6">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
              >
                Your Password
              </label>
              <AiOutlineUnlock className="absolute top-4 right-4 text-gray-400 text-xl" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="text-blue-600"
                />
                <label htmlFor="remember" className="text-gray-600 ml-1">
                  Remember Me
                </label>
              </div>
              <Link to="" className="text-blue-500 cursor-pointer hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="border-2 border-sky-900 w-full text-lg rounded-full bg-sky-900 text-white hover:bg-sky-700 py-3 transition-colors duration-300"
            >
              Login
            </button>
            <div className="mt-6 text-center">
              <span className="text-gray-600">
                New Here?{" "}
                <Link to="/SignUp" className="text-blue-500 ml-1 hover:underline">
                  Create an Account
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
