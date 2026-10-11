import { useState } from 'react';
import Logo from './Logo.jsx';
import './App.css';
import TechBackground from './TechBackground.jsx';

// Auth
import LogIn from './auth/LogIn.jsx';
import SignUp from './auth/SignUp.jsx';

// Dashboard
import Home from './Dashboard/Home.jsx';
import SearchSpace from './Dashboard/SearchSpace.jsx';
import Cart from './Cart-and-checkout/Cart.jsx';
import Checkout from './Cart-and-checkout/Checkout.jsx';
import Orders from './Orders/Orders.jsx';
import Help from './Customer-Support/Help.jsx';

import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const isAuthRoot = location.pathname === '/' || (!isLoggedIn && location.pathname !== '/log-in' && location.pathname !== '/sign-up');

  return (
    <div className="AppDiv">
      <TechBackground />
      {!isLoggedIn && <Logo />}

      <div className='accessOptions'>
        {!isLoggedIn && isAuthRoot && (
          <div className="welcome-container">
            <div className="intro-message">
              <h3>Welcome to Gencore!</h3>
              <p>Please select an option below to access your account and explore our laptops of the future.</p>
            </div>

            <hr className='horizontal-line'/>
            
            <div className="buttons">
              <Link to="/log-in" className="accessButton log-in-button">Already have an account? LOG IN</Link>
              <Link to="/sign-up" className="accessButton sign-up-button">Create a new account! SIGN UP</Link>
            </div>
          </div>
        )}

        {!isLoggedIn && !isAuthRoot && (
          <div className="back-to-options" style={{ marginBottom: '10px' }}>
            <Link to="/" className="accessButton" style={{ padding: '0.5vh 1vw', fontSize: '0.9rem' }}>Back</Link>
          </div>
        )}

        {isLoggedIn && (
          <nav className="dashboardNav">
            <Link to="/home" className="navLink">HOME</Link>
            <Link to="/search" className="navLink">SEARCH</Link>
            <Link to="/cart" className="navLink">CART</Link>
            <Link to="/orders" className="navLink">ORDERS</Link>
            <Link to="/help" className="navLink">HELP</Link>
          </nav>
        )}

        <div className="mainContent">
          <Routes>
            <Route path='/' element={!isLoggedIn ? null : <Navigate to="/home" replace />} />
            <Route path='/log-in' element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/sign-up' element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/log-in" replace />} />
            <Route path='/search' element={isLoggedIn ? <SearchSpace /> : <Navigate to="/log-in" replace />} />
            <Route path='/cart' element={isLoggedIn ? <Cart /> : <Navigate to="/log-in" replace />} />
            <Route path='/checkout' element={isLoggedIn ? <Checkout /> : <Navigate to="/log-in" replace />} />
            <Route path='/orders' element={isLoggedIn ? <Orders /> : <Navigate to="/log-in" replace />} />
            <Route path='/help' element={isLoggedIn ? <Help /> : <Navigate to="/log-in" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;