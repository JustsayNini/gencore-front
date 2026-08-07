import { useState } from 'react';
import Logo from './Logo.jsx';
import './App.css';
import LogIn from './auth/LogIn.jsx';
import SignUp from './auth/SignUp.jsx';
import Home from './Home.jsx';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="AppDiv">
     
      {!isLoggedIn && <Logo />}

      
      <div className='accessOptions'>
        
       
        {!isLoggedIn && (
          <div className="buttons">
            <Link to="/log-in" className="accessButton log-in-button">Already have an account? LOG IN</Link>
            <Link to="/sign-up" className="accessButton sign-up-button">Create a new account! SIGN UP</Link>
          </div>
        )}
        
        
        <Routes>
          <Route path='/log-in' element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route 
            path='/home' 
            element={isLoggedIn ? <Home /> : <Navigate to="/log-in" replace />} 
          />
          <Route path="*" element={<Navigate to="/log-in" replace />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;