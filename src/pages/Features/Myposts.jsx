import { useEffect} from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { usePostsContext } from "../../hooks/usePostsContext";
import Navbar from "../../components/Navbar";
import Newcard from "../../components/Newcard";

const Myposts = () => {
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
                dispatch({type: 'SET_POSTS', payload: response.data})
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (user) fetchData();
    }, [dispatch, user, posts]);

    return (
        <div>
        <Navbar></Navbar> 
        <div className="card-list">
            {posts && posts.map(post => (
                        <Newcard key={post._id} post={post} showDeleteButton={true}/>
                    ))}</div>
        </div>
    );
};

export default Myposts;
