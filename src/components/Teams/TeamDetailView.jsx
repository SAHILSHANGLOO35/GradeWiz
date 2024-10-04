import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignmentCard from './Assignments/AssignmentCard';



const assignments = [
  { id: 1, title: 'Test 1', dueDate: 'Aug 3', timestamp: '8/2 3:23 PM' },
  { id: 2, title: 'Test 2', dueDate: 'Aug 8', timestamp: '7/25 11:39 AM' },
  { id: 3, title: 'Test 3', dueDate: 'Aug 16', timestamp: '8/9 10:10 AM' },
  { id: 4, title: 'Test 4', dueDate: 'Aug 3', timestamp: '8/2 3:23 PM' },
  { id: 5, title: 'Test 5', dueDate: 'Aug 8', timestamp: '7/25 11:39 AM' },
  { id: 6, title: 'Test 6', dueDate: 'Aug 16', timestamp: '8/9 10:10 AM' }
];

const members = [
  { name: 'Arkan Khan', rollNo: '22101A0049', branch: 'INFT' },
  { name: 'Anuj Gill', rollNo: '22101A0057', branch: 'INFT' },
  { name: 'Om Alve', rollNo: '22101A0073', branch: 'INFT' },
  { name: 'Sahil Shangloo', rollNo: '22101A0027', branch: 'INFT' },
];

function TeamDetailView() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [copySuccess, setCopySuccess] = useState(''); // For displaying copy status
  const navigate = useNavigate();
  const location = useLocation();
  const [teamCode, setTeamCode] = useState('');
  const [msg, setMsg] = useState('');

  const { abbreviation: passedAbbreviation, color: passedColor, title } = location.state || {};

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');

    // Fetch teams created by admin
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
          setTeamCode(data.teams); // Set fetched teams in the state
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


  // Function to handle copying the team code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(teamCode)
      .then(() => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000); // Clear after 2 seconds
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
            onClick={() => navigate('/generateQuestions')}
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
          {/* {assignments.map(assignment => (
            <AssignmentCard key={assignment.id} {...assignment} isAdmin={isAdmin} />
          ))} */}
        </div>
        )}
        
        {activeTab === 'members' && (
          <div className="bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll no.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* {members.map((member, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.rollNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.branch}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition-colors">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDetailView;