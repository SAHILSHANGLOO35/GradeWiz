import React, { useState } from 'react';
import { CalendarIcon } from "lucide-react";
import { useLocation } from 'react-router-dom';

const TestCreator = () => {
  const [testTitle, setTestTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [answers, setAnswers] = useState({});
  const location = useLocation();
  const questions = location.state?.questions; // Retrieve questions from location state

  console.log("Raw Questions:", questions); // Log the raw questions data

  // Parse questions safely
  const parseQuestions = () => {
    if (Array.isArray(questions)) return questions; // Return if already an array
    try {
      // Check if questions is a valid JSON string and sanitize it
      const sanitizedQuestions = questions.replace(/`/g, '').trim(); // Remove backticks
      return JSON.parse(sanitizedQuestions); // Try parsing the sanitized string
    } catch (e) {
      console.error('Error parsing questions:', e);
      return []; // Return an empty array if parsing fails
    }
  };

  const questionsArray = parseQuestions();

  const handleAnswerChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value // Update answers based on index
    });
  };

  const handlePublish = () => {
    const testData = {
      title: testTitle,
      dueDate,
      questions: questionsArray,
      answers
    };
    // Call the onPublish function with test data (make sure to define it)
    console.log("Test Data to Publish:", testData); // Placeholder for testing
  };

  return (
    <div className="space-y-6">
      {/* Create New Test Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Create New Test</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Test Title</label>
            <input
              type="text"
              value={testTitle}
              onChange={(e) => setTestTitle(e.target.value)}
              placeholder="Enter test title"
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <div className="relative">
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full pr-10"
              />
              <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Questions Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Questions</h2>
        <div className="space-y-6">
          {questionsArray.map((item, index) => (
            <div key={index} className="space-y-2">
              <p className="font-medium">{item.question}</p>
              <input
                type="text"
                placeholder="Enter your answer"
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
          ))}
        </div>
        <button 
          onClick={handlePublish} 
          className="bg-blue-600 text-white rounded-md py-2 px-4 w-full mt-4 hover:bg-blue-700"
        >
          Publish Test
        </button>
      </div>

      {/* Preview Assignment Card */}
      {testTitle && dueDate && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Preview Assignment Card</h2>
          <AssignmentCardPreview
            title={testTitle}
            dueDate={dueDate}
            timestamp={new Date().toISOString()}
          />
        </div>
      )}
    </div>
  );
};

// Preview component for AssignmentCard
const AssignmentCardPreview = ({ title, dueDate, timestamp }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold">📝 {title}</h3>
      <p className="text-sm text-gray-500">Created: {new Date(timestamp).toLocaleString()}</p>
      <p className="text-sm font-medium">Due: {new Date(dueDate).toLocaleString()}</p>
      <button className="bg-gray-200 text-gray-700 rounded-md py-2 px-4 w-full mt-4 hover:bg-gray-300">
        View Test
      </button>
    </div>
  );
};

export default TestCreator;
