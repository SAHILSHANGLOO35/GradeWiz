import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Sample student test results data for now
const testResults = [
  { name: 'Arkan Khan', rollNo: '22101A0049', marks: 85, attempted: true },
  { name: 'Anuj Gill', rollNo: '22101A0057', marks: 78, attempted: true },
  { name: 'Om Alve', rollNo: '22101A0073', marks: 92, attempted: false },
  { name: 'Sahil Shangloo', rollNo: '22101A0027', marks: 88, attempted: true },
];

const TestResultDashboard = () => {
  const { teamId, testId } = useParams(); // Capture the team and test ID from the URL
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch test results based on teamId and testId
    // Placeholder data for now
    setResults(testResults);
  }, [teamId, testId]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Test Results for Test {testId} (Team {teamId})</h1>
      
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.rollNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.attempted ? result.marks : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.attempted ? 'Attempted' : 'Not Attempted'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResultDashboard;
