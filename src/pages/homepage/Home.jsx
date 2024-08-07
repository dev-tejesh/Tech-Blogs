import { useEffect, useState } from "react";
import axios from "axios";
import Newcard from "../../components/Newcard";
import "./Home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/blog/all", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user.token]);

    return (
        <div>
            <Navbar />
            <div className="card-list">
                {posts.map(post => (
                    <Newcard key={post._id} post={post} showDeleteButton={false} />
                ))}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;

