
import axios from "axios";
import { useState } from "react";
import "./createpost.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";


const CreatePost = () => {
const client = axios.create({
        baseURL: "http://localhost:4000/"
    });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("tech");
  const image = "an image url";
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useAuthContext()
  const navigate = useNavigate()
  const addPosts = (title, content, tags, image) => {
    client
       .post('blog/create', {
          title: title,
          description: content,
          tag: tags,
          image: image
       }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        },
      })
       .then((response) => {
        console.log(response.data);
        navigate('/');
       }).catch((error) => {
        setError(error);
        console.log(error);
     });

    setTitle('');
    setSuccess("Post created successfully!");
      setContent("");
      // setTags("");
      // setImage("");
      setCategory("tech");
      // setFeaturedImage(null);
    
 };

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log("checking form values");
    console.log(title);
    console.log(content);
    // console.log(tags);
    console.log(image);
    addPosts(title, content, category, image);
 };
  return (
    <div>
    <Navbar></Navbar> 
    <div className="container">
      <h1>Create a New Post</h1>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form id="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="categories">Categories</label>
          <select
            id="categories"
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="tech">Tech</option>
            <option value="programming">Programming</option>
            <option value="tutorials">Tutorials</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="featured-image">Featured Image</label>
          <input
            type="file"
            id="featured-image"
            name="featured-image"
            // onChange={handleFileChange}
          />
        </div>
        <div className="form-group buttons">
          <button type="button" id="save-draft">Save as Draft</button>
          <button type="button" id="preview">Preview</button>
          <button type="submit">Publish</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreatePost;
