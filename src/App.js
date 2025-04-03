import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";
import Feed from "./pages/Feed";
import Records from "./pages/Records.js";
import "./App.css";
import Dashboard from "./pages/Dashboard.js";


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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/:id" element={<ArticleDetails />} />
        <Route path="/feed/" element={<Feed />} />
        <Route path="/records/" element={<Records />} />
        {/*<Route path="/dashboard/" element={<Dashboard />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
