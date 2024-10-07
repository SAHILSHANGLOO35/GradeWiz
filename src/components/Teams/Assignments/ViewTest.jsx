import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ViewTest = () => {
    const [questions, setQuestions] = useState([]);  // Store questions with answers here
    const location = useLocation();
    const title = location.state?.title;
    const teamCode = location.state?.teamCode;
    
    useEffect(() => {
        const fetchTestDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/tests/questions-by-title`, {
                    method: "POST",
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title })
                });

                const data = await response.json();

                // Set questions along with an empty answer field for each
                const formattedQuestions = data.questions.map((q) => ({
                    question: q.question,
                    answer: ''
                }));
                setQuestions(formattedQuestions);
            } catch (error) {
                console.error('Error fetching test details:', error);
            }
        };

        fetchTestDetails();
    }, [teamCode]);

    const handleAnswerChange = (index, value) => {
        // Update the answer for the specific question based on index
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/tests/submit-answers`, {
                method: "POST",
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`, // Send token from localStorage
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questions: questions,  // Send the questions along with their answers
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Submission successful:', data);
                // Handle success (show notification, redirect, etc.)
            } else {
                console.error('Submission failed:', response.status);
                // Handle error response
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
            // Handle network error
        }
    };
    

    return (
        <div className="space-y-6">
            {/* Questions Card */}
            <div className="bg-white shadow-md rounded-lg p-6 pt-24">
                <h2 className="text-xl font-bold mb-4">Questions</h2>
                <div className="space-y-6">
                    {questions.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <p className="font-medium">{item.question}</p>
                            <textarea
                                placeholder="Enter your answer"
                                value={item.answer}
                                rows="1"
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                className="border border-gray-300 rounded-md p-2 w-full"
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Submit Answers
                </button>
            </div>
        </div>
    );
};

export default ViewTest;
