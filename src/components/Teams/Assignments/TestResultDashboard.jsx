import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';

const TestResultDashboard = () => {
  const { teamId, testId } = useParams(); // Capture the team and test ID from the URL
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); // useNavigate for redirection
  const [members, setMembers] = useState([]); // State for members
  const [teamCode, setTeamCode] = useState(localStorage.getItem("teamCode"));
  const location = useLocation();
  const title = location.state?.title;

  useEffect(() => {
    fetchMembersWithMarks(); // Fetch members along with their marks
  }, []);

  // Function to fetch members along with their marks for a specific test
  async function fetchMembersWithMarks() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/team/all-members-with-marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ teamCode, title }) // Send the specific test name (title) in the request body
      });

      const data = await response.json();
      if (response.ok) {
        const teamMembers = data.team.members;
        console.log(teamMembers);
        setMembers(teamMembers); // Set members with their marks in state
      } else {
        setMsg(data.message || 'Failed to fetch members');
      }
    } catch (error) {
      console.error('Error fetching members with marks:', error);
      setMsg('Error fetching members');
    }
  }

  // Function to handle view response redirection
  const handleViewResponse = (username) => {
    navigate(`/team/${teamId}/test/${testId}/results/${localStorage.getItem("token")}`, { state: { title, username } });
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    // Prepare data for export
    const worksheetData = members.map((member) => ({
      Name: member.name,
      RollNo: member.rollNo,
      Branch: member.branch,
      Marks: member.totalGrade || "Not Attempted",
      Answers: member.answers
        .map(
          (ans) =>
            `Q: ${ans.question}\nA: ${ans.answer}\nGrade: ${ans.grade}\nFeedback: ${ans.feedback}`
        )
        .join("\n\n"), // Join each answer with a double newline for better readability
    }));
    

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Results");

    // Generate and download the Excel file
    XLSX.writeFile(workbook, `Test_Results_${title}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6 mt-12">
        <h1 className="text-2xl font-semibold text-gray-800">
          Results for Test {title}
        </h1>
        <button
          onClick={exportToExcel}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Export to Excel
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.length > 0 ? (
              members.map((member, index) => (
                <tr key={member._id || index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {member.totalGrade !== 0 ? (
                      member.totalGrade || "Not Available"
                    ) : "Not Attempted"}
                  </td>
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
                <td className="px-6 py-4 text-center text-sm text-gray-500" colSpan="5">
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
