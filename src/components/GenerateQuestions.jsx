import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const GradeGenerator = () => {
  const [prompt, setPrompt] = useState("Generate 5 questions of 2 marks each and no MCQ type questions, provide only questions no answer."); // Default prompt
  const [llmResponse, setLlmResponse] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [testCreated, setTestCreated] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");

  function handleGenerate(e) {
    e.preventDefault(); // Prevent form submission
    const formdata = new FormData();
    formdata.append("prompt", prompt); // Use the dynamic prompt from state
    if (selectedFile) {
      formdata.append("pdf", selectedFile);
    }

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/summarize", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLlmResponse(result.Questions || "No response received");
        setTestCreated(false); // Reset test creation
      })
      .catch((error) => console.error(error));
  }

  const handleRegenerate = () => {
    handleGenerate(); // Call the generation function again
  };

  const handleCreateTest = () => {
    setTestCreated(true);
  };

  const handleAnswerChange = (index, value) => {
    setUserAnswers({
      ...userAnswers,
      [index]: value,
    });
  };

  const handleSubmitTest = (e) => {
    e.preventDefault();
    const testData = {
      questions: llmResponse.split("\n"), // Ensure questions are an array
      answers: userAnswers,
    };

    fetch("http://127.0.0.1:5000/gradeTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })
      .then((response) => response.json())
      .then((result) => {
        setScore(result.score);
        setFeedback(result.feedback);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="grade-generator min-h-screen bg-gradient-to-br from-sky-100 to-sky-300 flex items-center justify-center py-24 px-6 lg:px-8 overflow-hidden">
      <div className="card bg-white shadow-2xl rounded-3xl p-12 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-sky-900 mb-8 text-center">
          Grade Generator
          <span className="text-lg font-medium text-gray-600 block">
            Upload your PDF and generate grades with ease!
          </span>
        </h1>

        <form className="space-y-8" onSubmit={handleGenerate}>
          <div className="upload-section flex flex-col items-center">
            <label
              htmlFor="file-upload"
              className="text-lg font-medium text-sky-700 mb-2 flex items-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faUpload}
                className="text-sky-700 hover:text-sky-800"
              />
              Upload PDF
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(event) => {
                setSelectedFile(event.target.files[0]);
              }}
            />
            <div className="upload-box mt-2 bg-gray-100 rounded-lg border-dashed border-4 border-sky-300 py-8 px-4 shadow-inner hover:shadow-lg transition-shadow duration-300">
              <p className="text-sm text-gray-500">
                {selectedFile
                  ? `Selected file: ${selectedFile.name}`
                  : "Drag and drop a PDF file here or click to upload"}
              </p>
            </div>
          </div>

          <div className="prompt-section flex flex-col">
            <label className="text-lg font-medium text-sky-700 mb-2 flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="text-sky-700 hover:text-sky-800"
              />
              Prompt
            </label>
            <textarea
              className="mt-1 p-4 block w-full rounded-lg border border-sky-300 shadow-lg focus:border-sky-500 focus:ring-sky-500 sm:text-sm transition-shadow duration-300 ease-in-out"
              rows="4"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt} // Controlled input for prompt
              placeholder="Describe the output you want to generate from the PDF..."
            ></textarea>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="reset"
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-sky-600 text-white py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Generate
            </button>
          </div>
        </form>

        {llmResponse && (
          <div className="response-section mt-12 p-6 bg-gray-100 rounded-lg shadow-inner">
            <h2 className="text-2xl font-bold text-sky-800 mb-4">
              Generated Questions:
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {llmResponse}
            </p>

            <div className="mt-8 flex gap-4 justify-center">
              <button
                className="bg-yellow-500 text-white py-2 px-6 rounded-lg"
                onClick={handleRegenerate}
              >
                Regenerate Questions
              </button>
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-lg"
                onClick={handleCreateTest}
              >
                Create Test
              </button>
            </div>
          </div>
        )}

        {testCreated && (
          <form className="test-form mt-12" onSubmit={handleSubmitTest}>
            <h2 className="text-2xl font-bold text-sky-800 mb-4">Test</h2>
            {llmResponse.split("\n").map((question, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{question}</p>
                <textarea
                  className="mt-1 p-4 block w-full rounded-lg border border-sky-300 shadow-lg"
                  rows="4"
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Write your answer here..."
                ></textarea>
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-lg mt-6"
            >
              Submit Test
            </button>
          </form>
        )}

        {score && feedback && (
          <div className="score-feedback mt-12">
            <h2 className="text-2xl font-bold text-green-800">Score: {score}</h2>
            <p className="text-gray-700 mt-4">Feedback: {feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeGenerator;
