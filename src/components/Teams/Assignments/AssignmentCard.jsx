import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({ title, dueDate, timestamp, isAdmin, teamId, testId }) => {
  const navigate = useNavigate();

  // Format the date if it exists
  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) return 'Invalid date';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date error';
    }
  };

  // Format timestamp if it exists
  const formatTimestamp = (timestampString) => {
    if (!timestampString) return '';
    
    try {
      const date = new Date(timestampString);
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return '';
    }
  };

  const handleClick = () => {
    if (isAdmin) {
      navigate(`/team/${teamId}/test/${testId}/results`, {state: {title}});
    } else {
      navigate(`/team/view-test`, {state: {title}});
    }
  };

  return (
    <div className="border rounded-lg shadow-sm mb-4 bg-white">
      <div className="flex items-center p-4 border-b">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white mr-3">
          📝
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-gray-900 text-lg font-medium mb-2">{title || 'Untitled Assignment'}</h3>
        <p className="text-gray-600 mb-3">
          {dueDate ? `Due: ${formatDate(dueDate)}` : 'No due date set'}
        </p>
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