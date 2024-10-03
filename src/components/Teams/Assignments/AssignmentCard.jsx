import React from 'react';

const AssignmentCard = ({ title, dueDate, timestamp }) => {
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
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
          View Test
        </button>
      </div>
    </div>
  );
};

export default AssignmentCard;
