import axios from "axios";
import { useState } from "react";
import "./createpost.css";
import { useAuthContext } from "../../hooks/useAuthContext";
// import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyD0xM0Mg-5v8j4t30ge91_3B0idPpXPzko",
  authDomain: "blogs-f7323.firebaseapp.com",
  projectId: "blogs-f7323",
  storageBucket: "blogs-f7323.appspot.com",
  messagingSenderId: "758440892295",
  appId: "1:758440892295:web:c9287b8298a28df4b36522",
  measurementId: "G-3MY96S310V",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const CreatePost = () => {
  const client = axios.create({
    baseURL: "http://13.234.231.217/api/",
    // baseURL: "https://blogs-backend-neon.vercel.app/",
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  // const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();
  const fileInputRef = useRef(null);

  // const navigate = useNavigate();

  // const handleFileChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //     setValidationErrors((prevErrors) => ({ ...prevErrors, image: "" }));
  //   }
  // };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes

      if (selectedFile.size > maxFileSize) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          image: "File size must be less than 10MB",
        }));
        setImage(null); // Reset the image if it's invalid
        return;
      }

      setImage(selectedFile);
      setValidationErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    }
  };


  const validateInputs = () => {
    let errors = {};
    if (!title.trim()) {
      errors.title = "Title is required";
    } else if (title.length < 15) {
      errors.title = "Title must be at least 15 characters";
    } else if (title.length > 80) {
      errors.title = "Title must be less than 80 characters";
    }
    if (!content.trim()) {
      errors.content = "Content is required";
    } else if (content.length < 300) {
      errors.content = "Content must be at least 300 characters";
    }
    if (!category) {
      errors.category = "Category is required";
    }
    if (!image) {
      errors.image = "Featured image is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const uploadImageAndGetURL = async () => {
    if (!image) {
      throw new Error("No image selected");
    }

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const addPosts = async (title, content, tags, imageURL) => {
    try {
      const response = await client.post(
        "blog/create",
        {
          title: title,
          description: content,
          tag: tags,
          image: imageURL,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(response.data);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccess("Post created successfully!");
      console.log(success);
       toast.success("Post created successfully!", {
         position: "top-right",
       });
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong, Please try again!", {
        position: "top-right",
      });
      console.log(error);
    }

    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);
    try {
      const imageURL = await uploadImageAndGetURL();
      addPosts(title, content, category, imageURL);
    } catch (error) {
      // setError(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleInputChange = (setter, name) => (e) => {
    setter(e.target.value);
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [name]: "" };
      if (name === "title" && e.target.value.length < 15) {
        newErrors.title = "Title must be at least 15 characters";
      }
      if (name === "title" && e.target.value.length > 80) {
        newErrors.title = "Title must be less than 80 characters";
      }
      if (name === "content" && e.target.value.length < 300) {
        newErrors.content = "Content must be at least 300 characters";
      }
      return newErrors;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Create a New Post</h1>
        <form id="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleInputChange(setTitle, "title")}
            />
            {validationErrors.title && (
              <span className="error-text">{validationErrors.title}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleInputChange(setContent, "content")}
            ></textarea>
            {validationErrors.content && (
              <span className="error-text">{validationErrors.content}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="categories">Categories</label>
            {/* <select
              id="categories"
              name="category"
              value={category}
              onChange={handleInputChange(setCategory, "category")}
            >
              <option value="tech">Tech</option>
              <option value="entertainment">Entertainment</option>
              <option value="news">News</option>
            </select> */}
            <select
              id="categories"
              name="category"
              value={category}
              onChange={handleInputChange(setCategory, "category")}
            >
              <option value="">Select Category</option>
              <option value="tech">Tech</option>
              <option value="entertainment">Entertainment</option>
              <option value="news">News</option>
            </select>

            {validationErrors.category && (
              <span className="error-text">{validationErrors.category}</span>
            )}
          </div>
          {/* <div className="form-group">
            <label htmlFor="featured-image">Featured Image</label>
            <input
              type="file"
              id="featured-image"
              name="image"
              onChange={handleFileChange}
            />
            {validationErrors.image && (
              <span className="error-text">{validationErrors.image}</span>
            )}
          </div> */}
          <div className="form-group">
            <label htmlFor="featured-image">Featured Image</label>
            <input
              type="file"
              id="featured-image"
              name="image"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {validationErrors.image && (
              <span className="error-text">{validationErrors.image}</span>
            )}
          </div>
          <div className="form-group buttons">
            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? (
                <TailSpin
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="loading"
                  className="spinner"
                />
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
