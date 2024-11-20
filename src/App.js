// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/predict";
import Scheme from "./pages/Scheme";
import Appointments from "./pages/Appointments";
import Detailsec from "./pages/detailsec";
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <video autoPlay loop muted className="background-video">
          <source src={`${process.env.PUBLIC_URL}/Background.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/scheme" className="nav-link">Scheme</Link>
          <Link to="/appointments" className="nav-link">Appointments</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/scheme" element={<Scheme />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/detailsec" element={<Detailsec/>}/>
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
