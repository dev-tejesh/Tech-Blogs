import  { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Post from "../../components/post";
// import { Link } from 'react-router-dom';
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar";


const Home = () => {
    const [posts, setPosts] = useState([]); // State to hold the fetched posts
    const { user } = useAuthContext()
    // useEffect hook
    useEffect(() => {
        // Function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/blog/all", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setPosts(response.data); // Set the state with the fetched posts
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error); // Log any error that occurs
            }
        };

        fetchData(); // Call the fetch function when the component mounts
    }, [user]); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="wrap">
            <Navbar></Navbar>    
            <div>
                {/* <div className="white bold">Latest Posts</div> */}
                <div className="sizedcontainer"></div>
                <div className="sizedcontainer"></div>
                <div className="items">
                    {posts.map(post => (
                        <Post key={post._id} post={post} showDeleteButton={false}/>
                    ))}
                    <div className="sizedcontainer"></div>
                </div>
            </div>
        </div>
    );
};

export default Home;
