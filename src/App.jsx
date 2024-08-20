import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div >
      <Routes>
        {<Route path="login" element={<Login />} />}
        <Route path="register" element={<Register />} />
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="" element={<Home />} />

        <Route path="landingpage" element={<LandingPage />} />


      </Routes>
    </div>
  );
}

export default App;
