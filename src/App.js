import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnimeItem from "./Components/AnimeItem";
import Gallery from "./Components/Gallery";
import Homepage from "./Components/HomePage";
import NavigationBar from "./Components/NavigationBar";

import "./App.css";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/anime/:id" element={<AnimeItem />} />
          <Route path="/character/:id" element={<Gallery />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
