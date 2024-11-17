import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { usePostsContext } from "../../hooks/usePostsContext";
import Navbar from "../../components/Navbar";
import Newcard from "../../components/Newcard";

const Myposts = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://13.234.231.217/api/blog/yourblogs",
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
    };
    console.log("came");
    if (user) fetchData();
  }, [user, dispatch]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="card-list">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Newcard key={post._id} post={post} showDeleteButton={true} />
          ))
        ) : (
          <p>No posts available. Create your first post!</p>
        )}
      </div>
    </div>
  );
};

export default Myposts;
