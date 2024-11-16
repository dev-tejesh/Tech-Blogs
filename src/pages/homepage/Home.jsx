// import { useEffect, useState } from "react";
// import axios from "axios";
// import Newcard from "../../components/Newcard";
// import "./Home.css";
// import { useAuthContext } from "../../hooks/useAuthContext";
// import Navbar from "../../components/Navbar";
// import Pagination from "../../components/pagination";
// import Loader from "../../components/Loader";
// import ErrorAlert from "../../components/ErrorAlert";

// const Home = () => {
//   const [posts, setPosts] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [postsPerPage] = useState(6);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useAuthContext();

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null); // Reset error state
//       try {
//         const response = await axios.get("http://localhost:4000/blog/all", {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         setPosts(response.data);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load posts. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [user.token]);

//   const filteredPosts = posts.filter((post) =>
//     category === "all" ? true : post.tag === category
//   );

//   const handleCategoryChange = (category) => {
//     setCategory(category);
//   };

//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <Navbar />
//       <div className="dropdown">
//         <button className="dropbtn">Sort By</button>
//         <div className="dropdown-content">
//           {["tech", "news", "entertainment", "all"].map((cat) => (
//             <a
//               key={cat}
//               onClick={() => handleCategoryChange(cat)}
//               className={category === cat ? "active" : ""}
//             >
//               {cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </a>
//           ))}
//         </div>
//       </div>
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <ErrorAlert message={error} />
//       ) : (
//         <div className="card-list">
//           {currentPosts.length > 0 ? (
//             currentPosts.map((post) => (
//               <Newcard key={post._id} post={post} showDeleteButton={false} />
//             ))
//           ) : (
//             <p>No posts available in this category.</p>
//           )}
//         </div>
//       )}
//       <Pagination
//         postsPerPage={postsPerPage}
//         totalPosts={filteredPosts.length}
//         paginate={paginate}
//         currentPage={currentPage}
//       />
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState } from "react";
import axios from "axios";
import Newcard from "../../components/Newcard";
import "./Home.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/Navbar";
import Pagination from "../../components/pagination";
import Loader from "../../components/Loader";
import ErrorAlert from "../../components/ErrorAlert";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axios.get("http://localhost:4000/blog/all", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.token]);

  const filteredPosts = posts.filter((post) =>
    category === "all" ? true : post.tag === category
  );

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setCurrentPage(1); // Reset to first page on category change
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="sort-container">
        <p className="white">Sort By: </p>
        <div className="dropdown">
          <button className="dropbtn">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
          <div className="dropdown-content">
            {["tech", "news", "entertainment", "all"].map((cat) => (
              <a
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={category === cat ? "active" : ""}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorAlert message={error} />
      ) : (
        <div className="card-list">
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <Newcard key={post._id} post={post} showDeleteButton={false} />
            ))
          ) : (
            <p>No posts available in this category.</p>
          )}
        </div>
      )}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filteredPosts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
