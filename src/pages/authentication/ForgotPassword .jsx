import { useState } from "react";
import "./ForgotPassword.css";
import Navbar from "../../components/Navbar";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TailSpin } from "react-loader-spinner";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setIsSubmitting(true);

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset link has been sent. Please check your mailbox.");
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 3000);
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                toast.error("No user found with this email address.");
            } else {
                toast.error("An error occurred while sending the reset email. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="forgot-password-container">
                <div className="inside">
                    <h1 className="center primary">Forgot Password</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // required
                        />
                    
                        <button
                            className="button"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {isSubmitting ? (
                                <TailSpin
                                    height="20"
                                    width="20"
                                    color="#fff"
                                    ariaLabel="loading"
                                    className="spinner"
                                />
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
