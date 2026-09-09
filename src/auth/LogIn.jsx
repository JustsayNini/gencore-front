import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const LogIn = ({ setIsLoggedIn }) => {
    

    const [logInData, setLogInData] = useState({
        userEmail: '',
        userPassword: ''
    });

    const [message, setMessage] = useState({
        message: '',
        type: ''
    });

    const navigate = useNavigate();
    
    const handleLogIn = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${API_URL}/usersession`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logInData)
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage({
                    message: data.message, 
                    type: 'error'
                });
                return;
            }

            
            setMessage({
                message: "You've been successfully logged in!",
                type: 'success'
            });

            setIsLoggedIn(true);
            navigate('/home');

            setTimeout(() => {
                navigate('/home');
            }, 1000);

        } catch (error) {
            console.error("Connection failed: ", error);
            setMessage({
                message: "Log In failed. Please try again.",
                type: 'error'
            });
        }
    };

    return ( 
        <div className="login-container">
            <h2>LOG-IN</h2>
            <form className="form-container" onSubmit={handleLogIn}>
                <label htmlFor="userEmail">Email: 
                    <input 
                        type="text" 
                        name="userEmail" 
                        id="userEmail" 
                        value={logInData.userEmail} 
                        onChange={(event) => setLogInData({...logInData, userEmail: event.target.value})}
                    />
                </label>

                <label htmlFor="userPassword">Password:  
                    <input 
                        type="password" 
                        name="userPassword" 
                        id="userPassword" 
                        value={logInData.userPassword} 
                        onChange={(event) => setLogInData({...logInData, userPassword: event.target.value})}
                    />
                </label>
                
                <button type="submit">Log In</button>
            </form>
            
            {message.type === 'error' ? (
                <p style={{color: 'red'}}>{message.message}</p>
            ) : (
                <p style={{color: 'green'}}>{message.message}</p>
            )}
        </div>
    );
}

export default LogIn;