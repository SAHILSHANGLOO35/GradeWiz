import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate    
import TeamCard from './TeamCard';  
import Modal from './Modal';     

function Teams() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const [teams] = useState([
    { id: 1, title: 'TE EM-5 INFT-A-2024', abbreviation: 'TE', color: '#8B5CF6' },
    { id: 2, title: 'Scholarship INFT', abbreviation: 'SI', color: '#3B82F6' },
    { id: 3, title: 'INFT_DWM_Lab_Div A_Batch 2', abbreviation: 'IA', color: '#059669' },
    { id: 4, title: 'ADSA Lab TE INFT A Batch 2', abbreviation: 'AL', color: '#EC4899' },
    { id: 5, title: 'ADSA_INFT_V_DIV A_2024_2025', abbreviation: 'AA', color: '#6B7280' },
  ]);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  const handleTeamClick = (abbreviation, color, title) => {
    navigate(`/team-detail-view/${abbreviation}`, { state: { abbreviation, color, title } }); // Pass title along with abbreviation and color
  };  

  return (
    <>
      <div className="p-6 pt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Teams</h1>
          <div>
            {isAdmin ? (
              <button
                onClick={() => setIsCreateModalOpen(true)}
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

        {!isAdmin && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {teams.map((team) => (
                <TeamCard 
                key={team.id} 
                {...team} 
                onClick={() => handleTeamClick(team.abbreviation, team.color, team.title)} // Pass abbreviation, color, and title
              />              
              ))}
            </div>
          </div>
        )}

        {isAdmin && (
          <div>
            <h2 className="text-lg font-semibold mb-2">My Teams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {teams.slice(0, 2).map((team) => (
                <TeamCard 
                key={team.id} 
                {...team} 
                onClick={() => handleTeamClick(team.abbreviation, team.color, team.title)} // Pass abbreviation, color, and title
              />              
              ))}
            </div>
          </div>
        )}

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
              placeholder="Enter team code"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Join Team
            </button>
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
              placeholder="Team name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Team description"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Create Team
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Teams;