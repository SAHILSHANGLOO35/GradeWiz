import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentCard from './Assignments/AssignmentCard';

function TeamDetailView() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [copySuccess, setCopySuccess] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [msg, setMsg] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);
  const [members, setMembers] = useState([]); // State for members

  const navigate = useNavigate();
  const location = useLocation();
  const { abbreviation: passedAbbreviation, color: passedColor, title } = location.state || {};

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');

    // Fetch teams and team tests after fetching teamCode
    async function fetchTeams() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/all-teams', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          data.teams.forEach((team) => {
            if (team.teamName === title) {
              setTeamCode(team.creationCode);
              fetchTests(team.creationCode); // Fetch the tests for the team
              fetchMembers(team._id); // Fetch members for the team
            }
          });
        } else {
          setMsg(data.message || 'Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        setMsg('Error fetching teams');
      }
    }

    // Fetch tests for the selected team
    async function fetchTests(teamCode) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/tests/team-tests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ teamCode }),
        });

        const data = await response.json();

        if (response.ok) {
          setAssignments(data.tests); // Set tests in state
        } else {
          setMsg(data.message || 'Failed to fetch tests');
        }
      } catch (error) {
        console.error('Error fetching tests:', error);
        setMsg('Error fetching tests');
      }
    }

    

    fetchTeams();
  }, [msg, title]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(teamCode)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(() => setCopySuccess('Failed to copy!'));
  };

  const openModal = (member) => {
    setMemberToRemove(member); // Set the member to be removed
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleRemove = async () => {
    console.log('Removing member:', memberToRemove);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/team/remove-member', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          teamId: memberToRemove.teamId, // Pass the team ID
          memberId: memberToRemove._id, // Pass the member ID
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update members after successful removal
        setMembers(prevMembers => prevMembers.filter(member => member._id !== memberToRemove._id));
        setMsg(data.message || 'Member removed successfully');
      } else {
        setMsg(data.message || 'Failed to remove member');
      }
    } catch (error) {
      console.error('Error removing member:', error);
      setMsg('Error removing member');
    }
    setIsModalOpen(false); // Close the modal
  };

  
  // Fetch members for the team
  async function fetchMembers() {
    console.log(teamCode)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/team/all-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({teamCode})
      });

      const data = await response.json();
      if (response.ok) {
        const teamMembers = data.team.members;
        console.log(teamMembers)
        setMembers(teamMembers); // Set members in state
      } else {
        setMsg(data.message || 'Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setMsg('Error fetching members');
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to remove this member?</h2>
            <p className='text-center'>{memberToRemove?.name}</p>
            <div className="mt-6 flex justify-center space-x-4 ">
              <button 
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" 
                onClick={closeModal}
              >
                Cancel
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Secondary Navbar */}
      <div className="fixed top-16 w-full z-10 flex items-center p-4 bg-white border-b border-gray-200 shadow-sm">
        <div 
          style={{ backgroundColor: passedColor }} 
          className="w-8 h-8 rounded flex items-center justify-center text-white mr-3"
        >
          {passedAbbreviation}
        </div>

        <div className="flex-grow">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">{title || 'General'}</h1>
            <div className="ml-8 space-x-4">
              <button 
                onClick={() => setActiveTab('posts')}
                className={`text-gray-700 pb-1 ${activeTab === 'posts' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
              >
                Posts
              </button>
              <button 
                onClick={() => {setActiveTab('members');
                                fetchMembers();
                }}
                className={`text-gray-700 pb-1 ${activeTab === 'members' ? 'border-b-2 border-blue-500 font-medium' : ''}`}
              >
                Members
              </button>
            </div>
          </div>
        </div>

        {/* Display Team Code with Copy Button */}
        <div className="ml-8 text-gray-500 flex items-center space-x-2">
          <span className="text-sm font-medium">Team Code: </span>
          <span className="text-blue-600 font-semibold">{teamCode}</span>
          <button 
            onClick={copyToClipboard} 
            className="bg-gray-200 text-gray-600 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            Copy
          </button>
          {copySuccess && (
            <span className="text-sm text-green-500 ml-2">{copySuccess}</span>
          )}
        </div>

        {isAdmin && (
          <button 
            onClick={() => navigate('/generateQuestions', { state: { teamCode } })}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center ml-4"
          >
            <span className="mr-2">✏️</span>
            Generate Test
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="pt-40 px-6">
      {activeTab === 'posts' && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {assignments.length > 0 ? (
              assignments.map((assignment) => (
                <AssignmentCard 
                  key={assignment._id}
                  title={assignment.title}
                  dueDate={assignment.dueDate}
                  timestamp={assignment.createdAt}
                  isAdmin={isAdmin}
                  teamId={assignment.team._id}
                  testId={assignment._id}
                />
              ))
            ) : (
              <p>No assignments available for this team.</p>
            )}
          </div>
        )}

        {/* Members Section */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  {isAdmin && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <tr key={member._id || index}> {/* Use unique key if available */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.rollNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.branch}</td>
                      {isAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button 
                            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors"
                            onClick={() => openModal(member)}
                          >
                            Remove
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={isAdmin ? 4 : 3} className="px-6 py-4 text-center text-sm text-gray-500">
                      No members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetailView;
