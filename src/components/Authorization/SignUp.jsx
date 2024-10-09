import React, { useState } from "react";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { MdPhone } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import axios from 'axios';

function Signup() {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = userType === "user"
      ? "http://127.0.0.1:8000/api/v1/user/signup"
      : "http://127.0.0.1:8000/api/v1/admin/signup";
  
    const dataToSend = userType === "user" 
      ? formData 
      : {
          name: formData.adminName,
          email: formData.adminEmail, 
          password: formData.adminPassword 
        };
  
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      setNotification("Signup successful!");
      setFormData({}); // Reset form data after successful signup
    } catch (error) {
      console.error("An error occurred during signup:", error);
      setNotification(error.response?.data?.message || "Signup failed. Please try again.");
    }
};

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <div className="bg-white border border-slate-300 rounded-xl p-10 shadow-xl backdrop-filter backdrop-blur-sm bg-opacity-70 relative w-full max-w-lg">
        <h1 className="text-4xl text-sky-900 font-bold text-center mb-6">Signup</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4 mb-6">
            <label>
              <input
                type="radio"
                value="user"
                checked={userType === "user"}
                onChange={() => setUserType("user")}
                className="mr-2"
              />
              User
            </label>
            <label>
              <input
                type="radio"
                value="admin"
                checked={userType === "admin"}
                onChange={() => setUserType("admin")}
                className="mr-2"
              />
              Admin
            </label>
          </div>

          {userType === "user" && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative my-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute text-sm text-gray-500 top-4 left-0"
                >
                  Your Name
                </label>
                <BsFillPersonFill className="absolute top-4 right-4 text-gray-400 text-xl" />
              </div>
              <div className="relative my-2">
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={formData.rollNo || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="rollNo"
                  className="absolute text-sm text-gray-500 top-4 left-0"
                >
                  Your Roll Number
                </label>
                <BiUser className="absolute top-4 right-4 text-gray-400 text-xl" />
              </div>
              <div className="relative my-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 top-4 left-0"
                >
                  Your Email
                </label>
                <HiOutlineMail className="absolute top-4 right-4 text-gray-400 text-xl" />
              </div>
              <div className="relative my-2">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 top-4 left-0"
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4 text-gray-400 text-xl" />
              </div>
              <div className="relative my-2">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="mobile"
                  className="absolute text-sm text-gray-500 top-4 left-0"
                >
                  Your Mobile Number
                </label>
                <MdPhone className="absolute top-4 right-4 text-gray-400 text-xl" />
              </div>
              <div className="relative my-2">
                <input
                  type="text"
                  id="branch"
                  name="branch"
                  value={formData.branch || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="branch"
                  className="absolute text-sm text-gray-500 top-4 left-0"
                >
                  Your Branch
                </label>
                <BiUser className="absolute top-4 right-4 text-gray-400 text-xl" />
              </div>
              <div className="relative my-4">
                <select
                  id="year"
                  name="year"
                  value={formData.year || ""}
                  onChange={handleChange}
                  className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                  required
                >
                  <option value="" disabled>Select Your Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                <label
                  htmlFor="year"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-4 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600"
                >
                  Your Year
                </label>
              </div>
            </div>
          )}

{userType === "admin" && (
  <div className="grid grid-cols-1 gap-4 mb-4">
    <div className="relative my-2">
      <input
        type="text"
        id="adminName"
        name="adminName"
        value={formData.adminName || ""}
        onChange={handleChange}
        className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
        placeholder=" "
        required
      />
      <label
        htmlFor="adminName"
        className="absolute text-sm text-gray-500 top-4 left-0"
      >
        Admin Name
      </label>
    </div>
    
    <div className="relative my-2">
      <input
        type="email"
        id="adminEmail"
        name="adminEmail"
        value={formData.adminEmail || ""}
        onChange={handleChange}
        className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
        placeholder=" "
        required
      />
      <label
        htmlFor="adminEmail"
        className="absolute text-sm text-gray-500 top-4 left-0"
      >
        Admin Email
      </label>
    </div>
    
    <div className="relative my-2">
      <input
        type="password"
        id="adminPassword"
        name="adminPassword"
        value={formData.adminPassword || ""}
        onChange={handleChange}
        className="block w-full py-3 px-0 text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
        placeholder=" "
        required
      />
      <label
        htmlFor="adminPassword"
        className="absolute text-sm text-gray-500 top-4 left-0"
      >
        Admin Password
      </label>
    </div>
  </div>
)}

          <button
            type="submit"
            className="w-full text-white bg-sky-900 font-medium rounded-lg text-sm py-2.5 text-center mt-6"
          >
            Sign up
          </button>

          {notification && (
            <div className="text-center text-green-500 mt-4">
              {notification}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
