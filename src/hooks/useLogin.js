import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);

        const authentication = getAuth();

        try {
            if (email === "" || password === "") {
                toast.error('Email and password are required');
                setIsLoading(false);
                return;
            }

            const response = await signInWithEmailAndPassword(authentication, email, password);

            const token = await response.user.getIdToken();
            const userEmail = response.user.email;

            const user = { token, email: userEmail };
            localStorage.setItem('user', JSON.stringify(user));

            dispatch({ type: 'LOGIN', payload: user });

            setIsLoading(false);
            // toast.success('Logged In Successfully');
            // toast.success("Success Notification !", {
            //     position: toast.POSITION.BOTTOM_CENTER,
            //   });
        } catch (err) {
            setIsLoading(false);
            switch (err.code) {
                case 'auth/invalid-email':
                    toast.error('Invalid email ID');
                    break;
                case 'auth/user-not-found':
                    toast.error('Please check your email');
                    break;
                case 'auth/wrong-password':
                    toast.error('Please check your password');
                    break;
                case 'auth/too-many-requests':
                    toast.error('Too many attempts, please try again later');
                    break;
                default:
                    toast.error('Login failed. Please try again.');
            }
        }
    };

    return { login, isLoading };
};
