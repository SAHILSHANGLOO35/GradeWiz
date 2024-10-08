import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // useNavigate instead of useHistory

// Sample student test results data for now
// const testResults = [
//   { name: 'Arkan Khan', rollNo: '22101A0049', marks: 85, attempted: true, userId: '1' },
//   { name: 'Anuj Gill', rollNo: '22101A0057', marks: 78, attempted: true, userId: '2' },
//   { name: 'Om Alve', rollNo: '22101A0073', marks: 92, attempted: false, userId: '3' },
//   { name: 'Sahil Shangloo', rollNo: '22101A0027', marks: 88, attempted: true, userId: '4' },
// ];

const TestResultDashboard = () => {
  const { teamId, testId } = useParams(); // Capture the team and test ID from the URL
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // useNavigate for redirection
  const [members, setMembers] = useState([]); // State for members
  const [teamCode, setTeamCode] = useState(localStorage.getItem("teamCode"));
  const location = useLocation();
  const title = location.state?.title;
  console.log(title)



  useEffect(() => {
    fetchMembers();
  },[])
  async function fetchMembers() {

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

  // useEffect(() => {
  //   // Fetch test results based on teamId and testId
  //   // Placeholder data for now
  //   setResults(testResults);
  // }, [teamId, testId]);

  // Function to handle view response redirection
  const handleViewResponse = (username) => {
    navigate(`/team/${teamId}/test/${testId}/results/${localStorage.getItem("token")}`, {state: {title, username }}); // Redirect using navigate
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Test Results for Test {testId} (Team {teamCode})
      </h1>

      {/* <div className="bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.rollNo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.attempted ? result.marks : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.attempted ? 'Attempted' : 'Not Attempted'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.attempted && (
                    <button
                      onClick={() => handleViewResponse(result.userId)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Response
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr key={member._id || index}> {/* Use unique key if available */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                    <button
                      onClick={() => handleViewResponse(member.name)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Response
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 text-center text-sm text-gray-500">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestResultDashboard;
