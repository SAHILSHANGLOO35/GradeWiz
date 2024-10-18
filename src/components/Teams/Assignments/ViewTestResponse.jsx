import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import axios from 'axios';

const ViewTestResponse = () => {
  const navigate = useNavigate();
  const { testName } = useParams(); // Assuming you're using react-router and passing testName as a URL parameter
  const [testResults, setTestResults] = useState([]);
  const [totalGrade, setTotalGrade] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const title = location.state?.title;
  const username = location.state?.username;

  useEffect(() => {
    const fetchTestResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/tests/student-results`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
          },
          body: { username, testName: title }
        });
        setTestResults(response.data.answers);
        setTotalGrade(response.data.totalGrade);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching test results:", err);
        setError(err.response?.data?.message || "An error occurred while fetching test results.");
        setIsLoading(false);
      }
    };

    fetchTestResults();
  }, [testName]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
            <h1 className="text-xl font-bold text-white text-center">Test Response: {testName}</h1>
            {totalGrade !== null && (
              <p className="text-white text-center mt-2">Total Grade: {totalGrade}</p>
            )}
          </div>

          <div className="p-8">
            {testResults.map((item, index) => (
              <div key={index} className="mb-10 last:mb-0">
                <div className="mb-4">
                  <p className="text-xl font-semibold text-gray-800 mb-3">{index + 1}. {item.question}</p>
                  <div className="bg-gray-50 border border-gray-300 rounded-md p-4 text-gray-800">
                    {item.answer}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-md border-l-4 border-blue-400">
                  <p className="font-semibold text-blue-800">Grade: {item.grade}</p>
                  <p className="font-semibold text-blue-800 mt-2">Feedback:</p>
                  {/* Render feedback as HTML */}
                  <div className="text-purple-800" dangerouslySetInnerHTML={{ __html: item.feedback }} />
                </div>
              </div>
            ))}

            <div className="mt-10 flex justify-center">
              <button
                onClick={handleBack}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
              >
                <ChevronLeft className="mr-2" size={24} />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTestResponse;
