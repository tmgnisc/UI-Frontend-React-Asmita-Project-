import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NavbarWrapper from './components/NavbarWrapper';
import SplashScreenHandler from './components/SplashScreenHandler';

import AnimatedWave from './components/AnimatedWave';
import Calendar from './components/Calendar';
import OneStep from './components/OneStep';
import PasswordResetRequest from './pages/Forgotpassword';
import Home from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPass';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));


  return (
    <Router>

      <NavbarWrapper />
      <ToastContainer />
      {/* {location.pathname !== '/' && location.pathname !== '/home' && <AnimatedWave />} */}
      <Routes>
        <Route path='/' element={<SplashScreenHandler />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/wave' element={<AnimatedWave />} />
        <Route path='/one_step' element={<OneStep/>} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<PasswordResetRequest/>}/>

        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </Router>
  );
};


export default App;
