import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const SignUp = ({ setIsLoggedIn }) => {
    const [signUpData, setSignUpData] = useState({
        userEmail:'',
        userFirstName:'',
        userSurname:'',
        userUsername:'',
        userPassword:''
    })

    const [message, setMessage] = useState({
        message:'',
        type: ''
    })

    const navigate = useNavigate(); 

    const handleSignUp = async (event) => {
        event.preventDefault()

        if(!signUpData.userEmail.includes('@') || !signUpData.userEmail.includes('.com')){
            setMessage({
                message: "Please fill in a valid email",
                type:'error'
            })
            return
        } else if(signUpData.userFirstName==='' || signUpData.userSurname==='' || signUpData.userUsername==='' || signUpData.userPassword===''){
            setMessage({
                message: 'Please fill in all fields',
                type: 'error'
            })
            return;
        }

        try {
            const response = await fetch(`${API_URL}/userinformation`, {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(signUpData)
            })

            const data = await response.json()

            if(!response.ok){
                setMessage({
                    message: data.message || "A server-side error occured.",
                    type: 'error'
                })
            } else {
                setMessage({
                    message:'Account created successfully! Logging you in...',
                    type:'success'
                })

                // Save user data & update global auth state
                localStorage.setItem("user", JSON.stringify(data.user));
                setIsLoggedIn(true);

                // Instantly navigate to home/dashboard
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
        } catch(error) {
            console.error("Connection failed: ", error)
            setMessage({
                message:"Sign Up failed. Please try again.",
                type:'error'
            })
        }
    }

    const handleChange = (event) => {
        setSignUpData({...signUpData, [event.target.name]: event.target.value})
    }
    
    return (
        <div className="signup-container">
            <h2>SIGN-UP</h2>
            <form className="form-container" onSubmit={handleSignUp}>
                <label htmlFor="userEmail" >Email: 
                    <input type="email" name="userEmail" id="userEmail" value={signUpData.userEmail} onChange={handleChange}/>
                </label>
                
                <label htmlFor="userFirstName">Name:
                    <input type="text" name="userFirstName" id="userFirstName" value={signUpData.userFirstName} onChange={handleChange}/> 
                </label>
                
                <label htmlFor="userSurname">Surname: 
                    <input type="text" name="userSurname" id="userSurname" value={signUpData.userSurname} onChange={handleChange}/>
                </label>
                
                <label htmlFor="userUsername">New Username: 
                    <input type="text" name="userUsername" id="userUsername" value={signUpData.userUsername} onChange={handleChange}/>
                </label>
                
                <label htmlFor="userPassword">Create Password: 
                    <input type="password" name="userPassword" id="userPassword" value={signUpData.userPassword} onChange={handleChange}/>
                </label>

                <button type="submit">Sign Up</button>
                {message.type==='error' ? <p style={{color:'red'}}>{message.message}</p> : <p style={{color:'green'}}>{message.message}</p>}
            </form>
        </div>
    );
}
 
export default SignUp;