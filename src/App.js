// import logo from './logo.svg';
import React from 'react'
import './App.css';
import Login from './Components/login';
import Signup from './Components/signup';
import Home from './Components/home';
// import SignInOutContainer from './containers';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() { 
  
  return (
    <div className='LoginPg'> 
    {/* <Login/> */}
    <Router>
        <Routes>
          <Route path="/signup" element={<Signup/>}>
          </Route>
          <Route path="/" element={<Login/>}>
          </Route>
          <Route path="/home" element={<Home/>}>
          </Route>

        </Routes>
      
    </Router>
    </div>
  );
}
  
export default App;


