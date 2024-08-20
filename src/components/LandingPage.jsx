import { useState } from "react";
import Navbar from "./Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className=" container mx-auto py-20 px-4">
          <div className=" flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Get insights quickly, with Google Forms
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Easily create and share online forms and surveys, and analyze
              responses in real-time.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Try Forms for Work
              </button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Go to Forms
              </button>
            </div>
          </div>
          <div className="mt-16">
            <div className="rounded-lg shadow-lg bg-gray-100 p-8">
              Here is the space for the image
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600">Don't have an account?</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
              Sign up for free
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
