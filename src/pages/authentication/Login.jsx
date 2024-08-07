
import { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import Navbar from "../../components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading } = useLogin();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            <Navbar />
            <div className="logincontainer">
                <div className="inside">
                    <h1 className="center primary">Login</h1>
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
                        <div className="primary down" onClick={() => { navigate('/reset') }}>
                            Forgot Password?
                        </div>
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
                                'Login'
                            )}
                        </button>
                        <div className="top">
                            <span className="center">Not a Member? <span className="primary" onClick={() => { navigate('/signup') }}>Signup Now</span></span>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;

