import { useEffect} from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import Post from "../../components/post";
import { usePostsContext } from "../../hooks/usePostsContext";
import Navbar from "../../components/Navbar";

const Myposts = () => {
    // const [myposts, setPosts] = useState([]);
    const { user } = useAuthContext()
    const {posts, dispatch} = usePostsContext()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/blog/yourblogs", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                // setPosts(response.data);
                dispatch({type: 'SET_POSTS', payload: response.data})
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (user) fetchData();
    }, [dispatch, user, posts]);

    // const handleDeletePost = (deletedPostId) => {
    //     setPosts(myposts.filter(post => post._id !== deletedPostId));
    // };

    return (
        <div>
        <Navbar></Navbar> 
        <div className="wrap">
            <div>
                <div className="sizedcontainer"></div>
                <div className="items">
                    {posts && posts.map(post => (
                        <Post
                            key={post._id}
                            post={post}
                            showDeleteButton={true}
                        />
                    ))}
                    <div className="sizedcontainer"></div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Myposts;
