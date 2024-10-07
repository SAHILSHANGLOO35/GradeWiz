import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentCard from './Assignments/AssignmentCard';

function TeamDetailView() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [copySuccess, setCopySuccess] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [msg, setMsg] = useState('');
  const [assignments, setAssignments] = useState([]); // State to hold tests (assignments)
  
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
             // Send the teamCode in the request
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

  return (
    <div className="bg-gray-50 min-h-screen">
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
                onClick={() => setActiveTab('members')}
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

        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow">
            {/* Member list */}
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetailView;
