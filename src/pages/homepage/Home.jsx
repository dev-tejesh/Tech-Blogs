import { useEffect, useState } from "react";
import axios from "axios";
import Newcard from "../../components/Newcard";
import "./Home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar";
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from "react-toastify";
import Pagination from "../../components/pagination";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("all"); // Default to 'all'
    const { user } = useAuthContext();
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:4000/blog/all", {
                    headers: {
                        Authorization: `Bearer ${user.token}`
                    }
                });
                setPosts(response.data); // Set all posts at once
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user.token]);

    // Filter posts by category
    const filteredPosts = posts.filter(post => 
        category === "all" ? true : post.tag === category
    );

    // Handler to update the category
    const handleCategoryChange = (category) => {
        setCategory(category); // Update the category state
    };

    // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Navbar />
            <div className="dropdown">
                <button className="dropbtn">Sort By</button>
                <div className="dropdown-content">
                    <a  onClick={() => handleCategoryChange("tech")} className={category === "tech" ? "active" : ""}>Tech</a>
                    <a  onClick={() => handleCategoryChange("news")} className={category === "news" ? "active" : ""}>News</a>
                    <a  onClick={() => handleCategoryChange("entertainment")} className={category === "entertainment" ? "active" : ""}>Entertainment</a>
                    <a  onClick={() => handleCategoryChange("all")} className={category === "all" ? "active" : ""}>All</a> {/* To reset to all posts */}
                </div>
            </div>
            <div className="card-list">
                {currentPosts.map(post => (
                    <Newcard key={post._id} post={post} showDeleteButton={false} />
                ))}
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            {/* <ToastContainer /> */}
        </div>
    );
};

export default Home;
