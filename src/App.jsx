import { Route, Routes } from "react-router-dom";
import Login from "./components/Authorization/Login";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Teams from "./components/Teams/Teams";
import GenerateQuestions from "./components/GenerateQuestions";
import Signup from "./components/Authorization/SignUp";
import TeamDetailView from "./components/Teams/TeamDetailView";
import TestResultDashboard from "./components/Teams/Assignments/TestResultDashboard";
import TestCreate from "./components/Teams/Assignments/TestCreate";
import ViewTest from "./components/Teams/Assignments/ViewTest";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="test-create" element={<TestCreate />} />
        <Route path="signup" element={<Signup />} />
        <Route path="teams" element={<Teams />} />
        <Route path="generateQuestions" element={<GenerateQuestions />} />
        <Route path="/" element={<LandingPage />} /> {/* Use "/" for the root URL */}
        <Route path="/team/:teamId/test/:testId/results" element={<TestResultDashboard />} />
        <Route path="team-detail-view/:abbreviation" element={<TeamDetailView />} /> {/* Keep only the parameterized route */}
        <Route path="/team/view-test" element={<ViewTest />} /> 

        
      </Routes>
    </div>
  );
}

export default App;
