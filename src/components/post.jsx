import "./Post.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";


const Post = ({ post, showDeleteButton}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
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
        <div className="insideitem">
            <img
                src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}
                alt={post.title}
            />
            <div className="blue">{post.tag}</div>
            <div className="white">{post.title}</div>
            <div className="white clamp">
                {post.description}
            </div>
            <span>
                <button onClick={handleReadMore} className="read-more">Read more</button>
                {showDeleteButton && (
                    <button onClick={handleDelete} className="delete-post">Delete</button>
                )}
            </span>
            <span className="fsmall grey">
                profile img
                <span>Profile Name</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </span>
            <div className="sizedcontainer"></div>
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
    );
};

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string,
        tag: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    }).isRequired,
    showDeleteButton: PropTypes.bool,

};

export default Post;
