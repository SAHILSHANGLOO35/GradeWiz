import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';  // Import useLocation
import AssignmentCard from './Assignments/AssignmentCard'; // Adjust path as per your folder structure

const assignments = [
  { id: 1, title: 'Test 1', dueDate: 'Aug 3', timestamp: '8/2 3:23 PM' },
  { id: 2, title: 'Test 2', dueDate: 'Aug 8', timestamp: '7/25 11:39 AM' },
  { id: 3, title: 'Test 3', dueDate: 'Aug 16', timestamp: '8/9 10:10 AM' },
];

function TeamDetailView({ teamName, abbreviation, color }) {  // Destructure color as a prop
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to get the passed state

  // Extract state from location
  const { abbreviation: passedAbbreviation, color: passedColor, title } = location.state || {};

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin');
    setIsAdmin(adminStatus === 'true');
  }, []);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {/* Secondary Navbar */}
        <div className="fixed top-16 w-full z-10 flex items-center p-4 bg-white border-b border-black shadow-md">
        <div 
            style={{ backgroundColor: passedColor }} 
            className={`w-8 h-8 rounded flex items-center justify-center text-white mr-3 hand`}
        >
            {passedAbbreviation}  {/* Use the passed abbreviation here */}
        </div>

          <div className="flex-grow">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">{title || 'General'}</h1> {/* Use the passed title here */}
              <div className="ml-8 space-x-4">
                <button className="text-gray-900 border-b-2 border-gray-900 pb-1">Posts</button>
              </div>
            </div>
          </div>

          {/* Generate Test button for Admins */}
          {isAdmin && (
            <button 
              onClick={() => navigate('/generateQuestions')}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              <span className="mr-2" aria-label="pencil">✏️</span>
              Generate Test
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="pt-40 p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {assignments.map(assignment => (
            <AssignmentCard key={assignment.id} {...assignment} />
          ))}
        </div>
      </div>
    </>
  );
}

export default TeamDetailView;
