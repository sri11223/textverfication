import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import the custom CSS file for additional styles
import Header  from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/Login';
import SignupForm from './components/signup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home';
import AboutPage from './components/about';
import InstructionsPage from './components/instructions';
const  App =() =>{
  
  return (
    <Router>
       {/* Include the Header component */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage/>} />
      <Route path="/instructions" element={<InstructionsPage/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes as needed */}
      </Routes>    
    </Router>

    
  );
}

export default App;
