import Login from "./pages/authentication/Login";
import Home from "./pages/homepage/Home";
import Singlepost from "./pages/singlepage/Pagepost"
import CreatePost from "./pages/Features/createpost";
import { Navigate } from "react-router-dom";
import Signup from "./pages/authentication/Signup";
import "./App.css"
import { useAuthContext } from "./hooks/useAuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Myposts from "./pages/Features/Myposts";
import ForgotPassword from "./pages/authentication/ForgotPassword ";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App"> 
      <Router>
        <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/"/>} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/reset" 
              element={!user ? <ForgotPassword></ForgotPassword> : <Navigate to="/reset" />} 
            />
            <Route path="/create" element={<CreatePost/>}></Route>
            <Route path="/post" element= {<Singlepost/>}></Route>
            <Route path="/myblogs" element = {<Myposts/>}></Route>
          {/* <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home/>}/>
          <Route path="/post" element= {<Singlepost/>}></Route>
          
          <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </Router>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
