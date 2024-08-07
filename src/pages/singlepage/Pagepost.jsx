import { useLocation } from "react-router-dom";
import "./pagepost.css";
import Navbar from "../../components/Navbar";
import { useAuthContext } from "../../hooks/useAuthContext";

const Singlepost = () => {
    const location = useLocation();
    const { user } = useAuthContext();
    const { postData } = location.state || {};
    const username = user? user.email.split('@')[0] : "";

    if (!postData) {
        return <div>No post data available.</div>;
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="wrap">
                <div className="flex">
                    <div className="insideflex">
                        <div className="tag">{postData.tag}</div>
                        <div className="title">{postData.title}</div>
                        <div className="profile-info">
                            {/* <img
                                className="profile-img"
                                src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}
                                alt="profile"
                            /> */}
                            <span className="profile-name">{username}</span>
                            <span className="post-date">{new Date(postData.createdAt).toLocaleDateString()}</span>
                        </div>
                        <img
                            className="setimg"
                            src={postData.image}
                            alt={postData.title}
                        />
                        <div className="description">
                            {postData.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singlepost;
