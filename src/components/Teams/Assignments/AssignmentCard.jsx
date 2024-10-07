import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({ title, dueDate, timestamp, isAdmin, teamId, testId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAdmin) {
      // Navigate to the results page with the teamId and testId in the URL
      navigate(`/team/${teamId}/test/${testId}/results`);
    } else {
      // Normal test view for non-admins (can be expanded later)
      navigate(`/team/view-test`,{state: {title}});
    }
  };

  return (
    <div className="border rounded-lg shadow-sm mb-4 bg-white">
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 bg-[#6264A7] rounded flex items-center justify-center text-white mr-3">
          📝
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">{timestamp}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-gray-900 text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-3">Due {dueDate}</p>
        <button 
          onClick={handleClick} 
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          {isAdmin ? 'View Result' : 'View Test'}
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
