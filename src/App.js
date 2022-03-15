import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Navbar from "./components/Layout/Navbar";

function App() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
