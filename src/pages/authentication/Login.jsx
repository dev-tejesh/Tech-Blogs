import { useState } from "react";
import "./Login.css";
import { useLogin } from "../../hooks/useLogin";
import Button from "../../components/button";
import Navbar from "../../components/Navbar";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (event) => {
        event.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            <Navbar></Navbar>
        <div className="logincontainer">
            <div className="inside">
                <h1 className="center primary">Login</h1>
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
                    <div className="primary down">Forgot Password?</div>
                    <Button disabled={isLoading} type="submit" text="Login" />
                    {error && <div className="error">{error}</div>}
                    <div className="top">
                        <span className="center">Not a Member? <span className="primary">Signup Now</span></span>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default Login;
