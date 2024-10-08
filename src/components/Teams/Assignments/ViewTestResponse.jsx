import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ViewTestResponse = () => {

  const navigate = useNavigate();
  const [testResults] = useState([
    {
      question: "What is React and why is it used?",
      answer: "React is a JavaScript library for building user interfaces. It's used for creating reusable UI components, efficiently updating and rendering components, and managing application state.",
      gradeResult: "Grade: 9/10. Excellent explanation covering key points of React's purpose and benefits."
    },
    {
      question: "Explain the concept of state in React and how it differs from props.",
      answer: "State in React represents mutable data that can change over time and affects a component's rendering. Unlike props, which are passed down from parent components and are immutable within the component, state is managed internally by the component and can be updated using setState().",
      gradeResult: "Grade: 10/10. Comprehensive explanation distinguishing state from props and mentioning key concepts."
    },
    {
      question: "What are React Hooks and how do they improve functional components?",
      answer: "React Hooks are functions that allow you to use state and other React features in functional components without writing a class. They improve functional components by enabling state management, side effects, context consumption, and more, leading to more concise and reusable code.",
      gradeResult: "Grade: 9/10. Great overview of Hooks and their benefits. Could mention specific hooks like useState or useEffect for a perfect score."
    },
    {
      question: "Describe the Virtual DOM and its role in React's performance optimization.",
      answer: "The Virtual DOM is a lightweight copy of the actual DOM kept in memory. React uses it to optimize performance by minimizing direct manipulations of the real DOM. When state changes, React first updates the Virtual DOM, compares it with the previous version, and then efficiently updates only the necessary parts of the real DOM.",
      gradeResult: "Grade: 10/10. Excellent explanation covering the concept, purpose, and performance benefits of the Virtual DOM."
    },
    {
      question: "What is JSX and why is it used in React?",
      answer: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It's used in React to describe what the UI should look like. JSX makes it easier to write and understand the structure of React components, allowing developers to write HTML-like code within JavaScript.",
      gradeResult: "Grade: 9/10. Very good explanation of JSX and its purpose. Could mention that JSX is transpiled to regular JavaScript for a perfect score."
    }
  ]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
            <h1 className="text-xl font-bold text-white text-center">Test Response</h1>
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
                  <p className="font-semibold text-blue-800">Feedback:</p>
                  <p className="text-purple-800">{item.gradeResult}</p>
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
