import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

// TeamSVG component
const TeamSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="400"
    height="300"
    viewBox="0 0 400 300"
    className="w-full h-auto"
  >
    <rect width="400" height="300" fill="#f0f4f8" />
    <circle cx="200" cy="150" r="100" fill="#3b82f6" opacity="0.1" />
    <circle cx="200" cy="150" r="80" fill="#3b82f6" opacity="0.2" />
    <circle cx="200" cy="150" r="60" fill="#3b82f6" opacity="0.3" />
    <circle cx="160" cy="120" r="20" fill="#3b82f6" />
    <circle cx="240" cy="120" r="20" fill="#3b82f6" />
    <circle cx="200" cy="180" r="20" fill="#3b82f6" />
    <path d="M180 150 L220 150" stroke="#3b82f6" strokeWidth="4" />
    <path d="M200 160 L200 200" stroke="#3b82f6" strokeWidth="4" />
  </svg>
);

function TeamPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamCode, setTeamCode] = useState("");

  useEffect(() => {
    // Fetch isAdmin value from local storage
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true"); // Convert to boolean
  }, []);

  const handleJoinTeam = () => {
    // Logic for joining a team
    console.log(`Joining team with code: ${teamCode}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="container mx-auto py-28 px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-9">
            <div className="flex flex-col items-start justify-center text-left sm:ml-20">
              <h1 className="font-cabin glue-headline glue-headline--headline-2 hero-heading text-4xl sm:text-6xl mb-10 font-extralight">
                <div className="mb-5">Join or Create</div>
                <div className="mb-5">your team with</div>
                TeamConnect
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Collaborate effectively with your peers. <br />
                Join an existing team or create a new one in seconds.
                <br className="hidden sm:block" />
              </p>

              {isAdmin ? (
                <button className="bg-blue-600 text-white font-cabin text-center font-semibold py-3 px-6 rounded-sm">
                  Create a Team
                </button>
              ) : (
                <div className="flex flex-col items-start">
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={teamCode}
                      onChange={(e) => setTeamCode(e.target.value)}
                      placeholder="Enter Team Code"
                      className="border-2 border-gray-300 rounded-md py-2 px-4 mr-2"
                    />
                    <button
                      onClick={handleJoinTeam}
                      className="bg-blue-600 text-white font-cabin text-center font-semibold py-3 px-4 rounded-md"
                    >
                      Join Team
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl sm:justify-self-end mr-10 ">
              <TeamSVG />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamPage;
