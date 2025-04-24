import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";
import "./App.css";
import ModelDashboard from "./pages/ModelDashboard";
import AgeVerificationModal from "./components/AgeVerificationModal";


const App = () => {
  const selectedTheme = localStorage.getItem("selectedTheme");

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
}

  if(selectedTheme === "dark"){
      setDarkMode();
  }
  return (
      <Router>
        <AgeVerificationModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/model/:id" element={<ArticleDetails />} />
          <Route path="/modeldashboard" element={<ModelDashboard />} />
        </Routes>
      </Router>
  );
};

export default App;
