import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArticleDetails from "./pages/ArticleDetails";
import Feed from "./pages/Feed";
import Records from "./pages/Records.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/feed/" element={<Feed />} />
        <Route path="/records/" element={<Records />} />
      </Routes>
    </Router>
  );
};

export default App;
