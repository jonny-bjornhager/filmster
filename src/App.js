import "./App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Pages/Home";
import Navbar from "./Components/Layout/Navbar";
import MediaInfo from "./Components/Pages/MediaInfo";
import Search from "./Components/Pages/Search";
import PageNotFound from "./Components/Pages/PageNotFound";

function App() {
  return (
    <div className="site-wrapper">
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="movie/:id" element={<MediaInfo type="movie" />} />
        <Route path="tv/:id" element={<MediaInfo type="tv" />} />
      </Routes>
    </div>
  );
}

export default App;
