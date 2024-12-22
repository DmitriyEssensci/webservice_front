import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Home from "./components/home/Home";
import UsersPage from "./components/users_list/UsersPage";
import "./style.css";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/" element={<UsersPage />} />
      </Routes>
    </Router>
  );
};

export default App;