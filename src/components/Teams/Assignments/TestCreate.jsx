import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TestCreator = () => {
  const [testTitle, setTestTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [answers, setAnswers] = useState({});
  const [backendMessage, setBackendMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const questions = location.state?.questions;
  const teamCode = location.state?.teamCode;

  const parseQuestions = () => {
    if (Array.isArray(questions)) return questions;
    try {
      const sanitizedQuestions = questions.replace(/`/g, '').trim();
      return JSON.parse(sanitizedQuestions);
    } catch (e) {
      console.error('Error parsing questions:', e);
      return [];
    }
  };

  const questionsArray = parseQuestions();

  const handleAnswerChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value
    });
  };

  const handlePublish = async () => {
    const testData = {
      title: testTitle,
      duedate: dueDate,
      questions: questionsArray,
      teamCode
    };
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/tests/create-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(testData)
      });
  
      const data = await response.json();
      setBackendMessage(data.message || 'Test created successfully!');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating test:', error);
      setBackendMessage('Failed to create test.');
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 pt-24 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
            <h1 className="text-lg font-bold text-white text-center">Create New Test</h1>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Test Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Test Title</label>
                <input
                  type="text" required
                  value={testTitle}
                  onChange={(e) => setTestTitle(e.target.value)}
                  placeholder="Enter test title"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Due Date</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-10"
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800">Questions</h2>
              {questionsArray.map((item, index) => (
                <div key={index} className="space-y-2">
                  <p className="font-medium text-gray-700">{index + 1}. {item.question}</p>
                  <input
                    type="text"
                    placeholder="Enter your answer"
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Publish Button */}
            <div className="flex justify-center">
              <button 
                onClick={handlePublish} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Publish Test
              </button>
            </div>

            {/* Preview Assignment Card */}
            {testTitle && dueDate && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Preview Test Details</h2>
                <AssignmentCardPreview
                  title={testTitle}
                  dueDate={dueDate}
                  timestamp={new Date().toISOString()}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Backend Message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Status</h2>
            <p className="text-lg text-gray-600">{backendMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Preview component for AssignmentCard
const AssignmentCardPreview = ({ title, dueDate, timestamp }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800">📝 {title}</h3>
      <p className="text-sm text-gray-500 mt-2">Created: {new Date(timestamp).toLocaleString()}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">Due: {new Date(dueDate).toLocaleString()}</p>
    </div>
  );
};

export default TestCreator;