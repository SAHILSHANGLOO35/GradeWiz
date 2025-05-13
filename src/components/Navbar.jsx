import React, { useState, useEffect } from "react";
import { MdDensityMedium } from "react-icons/md";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLogout() {
    localStorage.clear();
    navigate("/login")
  }

  return (
    <div>
      <div
        className={`fixed w-full h-16 top-0 left-0 bg-white px-5 flex justify-between items-center transition-all duration-300 z-10 ${
          scrolled ? "shadow-md drop-shadow-md" : "shadow-none"
        }`}
      >
        <div className="flex items-center px-0.5 cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 rounded-full border border-gray-300 shadow-sm flex mr-3"
          />
          <div className="font-cabin font-bold text-green-700">
            <span className="text-3xl">Grade<span className="text-blue-600">Wiz</span></span>
          </div>
        </div>

        <MdDensityMedium
          className="lg:hidden text-black text-3xl cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            toggle ? "flex" : "hidden"
          } lg:flex absolute lg:static top-20 right-0 lg:right-auto bg-gray-100 lg:bg-transparent w-full lg:w-auto p-6 lg:p-0 flex-col lg:flex-row items-center lg:space-x-8 space-y-4 lg:space-y-0 rounded-lg lg:rounded-none shadow-lg lg:shadow-none`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0">
            <li>
              <a
                href="/"
                className="font-cabin font-bold text-md relative uppercase tracking-wide text-[#5f6368] lg:text-[#5f6368] hover:before:scale-x-100 before:content-[''] before:bg-[#5f6368] lg:before:bg-[#5f6368] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:origin-left"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="text-[#5f6368] font-cabin text-md font-bold relative uppercase tracking-wide lg:text-[#5f6368] hover:before:scale-x-100 before:content-[''] before:bg-[#5f6368] lg:before:bg-[#5f6368] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:origin-left"
              >
                SIGN IN
              </a>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="font-cabin font-bold cursor-pointer text-md relative uppercase tracking-wide text-[#5f6368] lg:text-[#5f6368] hover:before:scale-x-100 before:content-[''] before:bg-[#5f6368] lg:before:bg-[#5f6368] before:absolute before:bottom-0 before:left-0 before:w-full before:h-[2px] before:transform before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:origin-left"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
