import "../pages/homepage/Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostsContext } from "../hooks/usePostsContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Newcard = ({ post, showDeleteButton }) => {
  const navigate = useNavigate();
  const { dispatch } = usePostsContext();
  const handleReadMore = () => {
    navigate("/post", { state: { postData: post } });
  };

  const { user } = useAuthContext();
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://blogsbackend.tejesh.in/blog/delete/${post._id}`,
        // `https://blogs-backend-neon.vercel.app/blog/delete/${post._id}`,

        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      try {
        const response = await axios.get(
          "https://blogsbackend.tejesh.in/blog/yourblogs",
          // "https://blogs-backend-neon.vercel.app/blog/yourblogs",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        dispatch({ type: "SET_POSTS", payload: response.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      toast.success("Post deleted successfully");
      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    } catch (error) {
      toast.error("Something went wrong. Please try later!");
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
      </div>
    </div>
  );
};

export default Newcard;
