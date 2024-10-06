import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";  // Import useNavigate for routing
import TestCreator from './Teams/Assignments/TestCreate';

const GradeGenerator = () => {
  const [prompt, setPrompt] = useState("Generate 5 questions of 2 marks each and no MCQ type questions, provide only questions no answer. in JSON format");
  const [llmResponse, setLlmResponse] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [testCreated, setTestCreated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const teamCode = location.state?.teamCode;
  console.log(teamCode)

  function handleGenerate(e) {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("prompt", prompt);
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
    // Extract the 'Questions' string
    let questionsString = result.Questions;

    // Remove backticks and 'json' tag
    questionsString = questionsString.replace(/```json|```/g, "").trim();

    // Parse the cleaned string as JSON
    const questionsArray = JSON.parse(questionsString);

    // Set the array of question objects into state (unchanged structure)
    setLlmResponse(questionsArray);
    setTestCreated(false);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


  }

  const handleCreateTest = () => {
    // Navigate to TestCreate component with llmResponse as state
    navigate("/test-create", { state: { questions: llmResponse, teamCode } });
  };

  const handlePublishTest = (testData) => {
    // Send the test data to your backend
    fetch("http://127.0.0.1:5000/publishTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Test published successfully:', result);
      })
      .catch((error) => console.error('Error publishing test:', error));
  };

  return (
    <div className="grade-generator min-h-screen bg-gradient-to-br from-sky-100 to-sky-300 flex items-center justify-center py-24 px-6 lg:px-8 overflow-hidden">
      <div className="card bg-white shadow-2xl rounded-3xl p-12 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-sky-900 mb-8 text-center">
          Test Generator
          <span className="text-lg font-medium text-gray-600 block">
            Upload your PDF and generate test questions!
          </span>
        </h1>

        {!testCreated ? (
          <>
            <form className="space-y-8" onSubmit={handleGenerate}>
              {/* Upload Section */}
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

              {/* Prompt Section */}
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

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8">
                <button type="reset" className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg">
                  Clear
                </button>
                <button type="submit" className="bg-sky-600 text-white py-2 px-6 rounded-lg">
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
                  {typeof llmResponse === 'string' ? llmResponse : JSON.stringify(llmResponse, null, 2)}
                </p>

                <div className="mt-8 flex gap-4 justify-center">
                  <button
                    className="bg-yellow-500 text-white py-2 px-6 rounded-lg"
                    onClick={handleGenerate}
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
          </>
        ) : (
          <TestCreator
            questions={llmResponse}
            onPublish={handlePublishTest}
          />
        )}
      </div>
    </div>
  );
};

export default GradeGenerator;
