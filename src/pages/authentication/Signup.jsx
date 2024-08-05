
import Button from "../../components/button";
import Navbar from "../../components/Navbar";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";
import { useState } from "react";


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

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
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" disabled = {isLoading} text = "Sign Up"/>
                    {error && <div className="error">{error}</div>}
                    <div className="top">
                        <span className="center">Already a Member? <span className="primary">Login</span></span>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Signup;
