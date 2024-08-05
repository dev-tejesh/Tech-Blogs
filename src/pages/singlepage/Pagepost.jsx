import { useLocation } from "react-router-dom";
import "./pagepost.css";

const Singlepost = () => {
    const location = useLocation();
    const { postData } = location.state || {}; // Destructure the postData from location.state

    if (!postData) {
        return <div>No post data available.</div>; // Handle case when no postData is available
    }

    return (
        <div className="wrap">
            <div className="flex">
                <div className="insideflex">
                    <div className="sizedbox"></div>
                    <div className="tag white">{postData.tag}</div>
                    <div className="sizedbox"></div>
                    <div className="white title">{postData.title}</div>
                    <span className="fsmall grey">
                        profile img
                        <span>profileName</span>
                        <span>{new Date(postData.createdAt).toLocaleDateString()}</span>
                    </span>
                    <div className="sizedbox"></div>
                    <img
                        className="setimg"
                        src={"https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"}
                        alt={postData.title}
                    />
                    <div className="sizedbox"></div>
                    <div className="style white">
                        {postData.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Singlepost;

