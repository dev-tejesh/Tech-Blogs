import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { PostsContextProvider } from './context/PostContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <AuthContextProvider>
    <PostsContextProvider>
    <App />
    </PostsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


