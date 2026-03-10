import React from "react";
import { BrowserRouter as Router, Route, Routes, Link,Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import './App.css';
  import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
            <ToastContainer />

    <Router>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;