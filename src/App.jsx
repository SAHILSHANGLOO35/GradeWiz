import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import GenerateQuestions from "./components/GenerateQuestions";
import Signup from "./components/SignUp";

function App() {
  return (
    <div >
      <Routes>
        {<Route path="login" element={<Login />} />}
        <Route path="signup" element={<Signup />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="" element={<Home />} /> */}
        <Route path="home" element={<Home />} />
        <Route path="generateQuestions" element={<GenerateQuestions />} />

        <Route path="landingpage" element={<LandingPage />} />
        <Route path="" element={<LandingPage />} />





      </Routes>
    </div>
  );
}

export default App;
