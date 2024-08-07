
import { useNavigate } from "react-router-dom";
// import Button from "../../components/button";
import Navbar from "../../components/Navbar";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";
import { useState } from "react";
import { TailSpin } from 'react-loader-spinner';
import { ToastContainer } from "react-toastify";


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(error)
    await signup(email, password)

  }
    return (
        <div>
        <Navbar></Navbar>
        <div className="logincontainer">
            <div className="inside">
                <h1 className="center primary">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        
                    />
                     <button
                            className="button"
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? (
                                <TailSpin
                                    height="20"
                                    width="20"
                                    color="#fff"
                                    ariaLabel="loading"
                                    className="spinner"
                                />
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    <div className="top">
                        <span className="center">Already a Member? <span className="primary" onClick={()=>{navigate('/login')}}>Login</span></span>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
        </div>
    );
};

export default Signup;
