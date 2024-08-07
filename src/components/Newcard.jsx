import "../pages/homepage/Home.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useNavigate } from "react-router-dom";

const Newcard = ({ post, showDeleteButton }) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")
    const { dispatch} = usePostsContext()
    const handleReadMore = () => {
        navigate('/post', { state: { postData: post } });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const { user } = useAuthContext();
    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:4000/blog/delete/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setSnackbarMessage("Post deleted successfully");
            setOpen(true)
            dispatch({type: 'DELETE_WORKOUT', payload: response.data})
        } catch (error) {
            setSnackbarMessage("Error deleting post");
            setOpen(true);
            console.error("Error deleting post:", error);
        }
    };
  return (
    <div className="card-item">
      <img src={post.image} alt="Card Image"></img>
      <span className="developer">{post.tag}</span>
      <h3>{post.title}</h3>
      <div className="card-actions">
        <button className="arrow" onClick={handleReadMore}>
            <i className="fas fa-arrow-right card-icon"></i>
        </button>
        {showDeleteButton && (
                    <button className="delete-btn" onClick={handleDelete}>
                    <i className="fas fa-trash"></i>
                  </button>
                )}
        <Snackbar
                open={open}
                autoHideDuration={60000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        
      </div>
    </div>
  );
};

export default Newcard;
