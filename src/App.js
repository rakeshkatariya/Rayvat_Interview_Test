import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from './components/Navbaar';
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginForm from './components/Login.js';
import Home from './components/Home.js';
import { useState, useEffect } from 'react';
import Checkout from './components/Checkout.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.accessToken) {
        setIsLoggedIn(true);
        navigate('/Home');
      }
    }
  }, [localStorage]);

  const handleLogin = (userData) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsLoggedIn(true);
    navigate('/Home');
  };

  return (
    <>
      {isLoggedIn && <Navbaar />}
      <Routes>
        <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/Home" element={isLoggedIn ? <Home /> : <LoginForm onLogin={handleLogin} />} />
        <Route path="/Checkout" element={isLoggedIn ? <Checkout /> : <LoginForm onLogin={handleLogin} />} />
      </Routes>
    </>
  );
}

export default App;
