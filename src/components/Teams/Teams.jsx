import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';    
import TeamCard from './TeamCard';
import Modal from './Modal';

function Teams() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [msg, setMsg] = useState("");
  const [teamCode, setTeamCode] = useState(''); // Changed state for join code to teamCode
  const [teams, setTeams] = useState([]); // Initialize state to store fetched teams
  const navigate = useNavigate(); // Initialize useNavigate

  const colorArray = ['#8B5CF6', '#3B82F6', '#059669', '#EC4899', '#6B7280']; // Array of colors

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');

    async function fetchTeams() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/all-teams', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
          }
        });

        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          setTeams(data.teams);
        } else {
          setMsg(data.message || 'Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setMsg('Error fetching teams');
      }
    }

    fetchTeams();
  }, [msg]);

  const handleTeamClick = (abbreviation, color, title) => {
    navigate(`/team-detail-view/${abbreviation}`, { state: { abbreviation, color, title } });
  };

  async function handleTeamCreate() {
    const req = await fetch(`http://127.0.0.1:8000/api/v1/team/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ teamName, description: teamDesc })
    });

    const res = await req.json();
    setMsg(res.message);
    if (res.success) {
      setIsCreateModalOpen(false);
      setTeamName('');
      setTeamDesc('');
      fetchTeams(); // Refresh the teams after creating a new one
    }
  }

  async function handleJoinTeam() {
    const req = await fetch(`http://127.0.0.1:8000/api/v1/join-team/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ teamCode }) // Use teamCode instead of joinCode
    });

    const res = await req.json();
    setMsg(res.message);
    if (res.success) {
      setIsJoinModalOpen(false);
      setTeamCode(''); // Reset teamCode after successful join
      fetchTeams(); // Refresh the teams after joining a new one
    }
  }

  const generateAbbreviation = (teamName) => {
    return teamName.slice(0, 2).toUpperCase(); 
  };

  const getRandomColor = () => {
    return colorArray[Math.floor(Math.random() * colorArray.length)]; 
  };

  return (
    <>
      <div className="p-6 pt-20 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Teams</h1>
          <div>
            {isAdmin ? (
              <button
                onClick={() => {
                  setIsCreateModalOpen(true);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center"
              >
                <span className="mr-2">+</span>
                Create Team
              </button>
            ) : (
              <button
                onClick={() => setIsJoinModalOpen(true)}
                className="border border-gray-300 py-2 px-4 rounded hover:bg-gray-50 transition-colors flex items-center"
              >
                <span className="mr-2">👥</span>
                Join Team
              </button>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">{isAdmin ? "My Teams" : "Classes"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {teams.map((team) => (
              <TeamCard
                key={team._id}
                abbreviation={generateAbbreviation(team.teamName)}
                color={getRandomColor()}
                title={team.teamName}
                onClick={() => handleTeamClick(generateAbbreviation(team.teamName), getRandomColor(), team.teamName)}
              />
            ))}
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
          title="Join a Team"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Enter the team code to join an existing team
            </p>
            <input
              type="text"
              onChange={(e) => setTeamCode(e.target.value)} // Update teamCode on change
              placeholder="Enter team code"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleJoinTeam} // Handle team join
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Join Team
            </button>
            {msg.length !== 0 && <h1 className="text-green-500">{msg}</h1>} {/* Display message */}
          </div>
        </Modal>

        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create a New Team"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Fill in the details to create your team
            </p>
            <input
              type="text"
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Team name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              onChange={(e) => setTeamDesc(e.target.value)}
              placeholder="Team description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleTeamCreate} 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Create Team
            </button>
            {msg.length !== 0 && <h1 className="text-green-500">{msg}</h1>} {/* Display message */}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Teams;
