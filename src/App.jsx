import { useState } from 'react';
import Logo from './Logo.jsx';
import './App.css';

// Auth
import LogIn from './auth/LogIn.jsx';
import SignUp from './auth/SignUp.jsx';

// Dashboard
import Home from './Dashboard/Home.jsx';
import SearchSpace from './Dashboard/SearchSpace.jsx';

// Cart and Checkout
import Cart from './Cart-and-checkout/Cart.jsx';
import Checkout from './Cart-and-checkout/Checkout.jsx';

// Orders
import Orders from './Orders/Orders.jsx';

// Customer Support
import Help from './Customer-Support/Help.jsx';

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
            <Route path='/log-in' element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/home' element={isLoggedIn ? <Home /> : <Navigate to="/log-in" replace />} />
            <Route path='/search' element={isLoggedIn ? <SearchSpace /> : <Navigate to="/log-in" replace />} />
            <Route path='/cart' element={isLoggedIn ? <Cart /> : <Navigate to="/log-in" replace />} />
            <Route path='/checkout' element={isLoggedIn ? <Checkout /> : <Navigate to="/log-in" replace />} />
            <Route path='/orders' element={isLoggedIn ? <Orders /> : <Navigate to="/log-in" replace />} />
            <Route path='/help' element={isLoggedIn ? <Help /> : <Navigate to="/log-in" replace />} />
            <Route path="*" element={<Navigate to="/log-in" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;