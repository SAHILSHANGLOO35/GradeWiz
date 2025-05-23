import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader.jsx';

const ViewTest = () => {
    const [questions, setQuestions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [alreadyAttempted, setAlreadyAttempted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const title = location.state?.title;
    const teamCode = location.state?.teamCode;
    const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

    console.log("View result")

    useEffect(() => {
        const checkTestAttempt = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/tests/check-attempt', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ testName: title}),
                });

                const data = await response.json();
                console.log(data)
                if (response.ok && data.message === 'You have already attempted the test.') {
                    setAlreadyAttempted(true);
                    setModalMessage(data.message);
                    setModalVisible(true);
                } else {
                    fetchTestDetails();
                }
            } catch (error) {
                console.error('Error checking test attempt:', error);
            }
        };

        const fetchTestDetails = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/v1/tests/questions-by-title', {
                    method: 'POST',
                    headers: {
                        'Authorization': `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title })
                });

                const data = await response.json();
                const formattedQuestions = data.questions.map((q) => ({
                    question: q.question,
                    answer: ''
                }));
                setQuestions(formattedQuestions);
            } catch (error) {
                console.error('Error fetching test details:', error);
            }
        };

        checkTestAttempt();
    }, [teamCode, title, userId]);

    const handleAnswerChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].answer = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        const emptyAnswers = questions.some((q) => q.answer.trim() === '');
        if (emptyAnswers) {
            setModalMessage('Please fill in all answers before submitting.');
            setModalVisible(true);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/tests/submit-answers', {
                method: 'POST',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questions,
                    title
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Submission successful:', data);
                setModalMessage('Submission successful!');
            } else {
                console.error('Submission failed:', response.status);
                setModalMessage('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting answers:', error);
            setModalMessage('Error submitting answers. Please try again.');
        } finally {
            setLoading(false);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        if (alreadyAttempted) {
            const navigate = useNavigate();
            navigate(-1);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4 pt-24 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-200">
                    {/* Heading Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
                        <h1 className="text-xl font-bold text-white text-center">{title || 'Test Questions'}</h1>
                    </div>

                    {/* Loader Section */}
                    {loading && (
                        <div className="flex justify-center items-center p-8">
                            <Loader /> {/* Display loader when loading is true */}
                        </div>
                    )}

                    {/* Question and Answer Section */}
                    {!loading && !alreadyAttempted && (
                        <div className="p-8">
                            <div className="space-y-8">
                                {questions.map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <p className="font-semibold text-gray-800">{index + 1}. {item.question}</p>
                                        <div className="bg-gray-50 border border-gray-300 rounded-md" style={{ height: '80px' }}>
                                            <textarea
                                                placeholder="Enter your answer"
                                                value={item.answer}
                                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none py-0 my-0"
                                                rows="4"
                                                style={{
                                                    minHeight: '70px',
                                                    maxHeight: '60px',
                                                    overflowY: 'auto',
                                                    padding: '4px',
                                                    margin: '0px',
                                                    resize: 'none',
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex justify-center">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Submit Answers
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Submission Status</h2>
                        <p className="text-lg text-gray-600">{modalMessage}</p>
                        <button
                            onClick={closeModal}
                            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {alreadyAttempted ? 'Go Back' : 'Close'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTest;
