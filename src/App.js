import Navibar from "./components/Navbar/Navbar";
import AllPost from "./components/Post/AllPost";
import { Routes, Route, Navigate } from "react-router-dom";
import MyBlogs from "./components/MyBlogs/MyBlogs";
import Auth from "./components/Login-SignUp/Auth";
import EditBlog from "./components/NewBlog/EditBlog";
import AddBlog from "./components/NewBlog/AddBlog";
import ViewBlog from "./components/Post/ViewBlog";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "./api";
import { LogOut } from "./redux/actions/UserAction";
import DashBoard from "./components/DashBoard/DashBoard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "flowbite-react";
import NotFound from "./components/404/NotFound";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const tokenStr = localStorage.getItem("blog-access-token");
  useEffect(() => {
    if (tokenStr) {
      const token = `Bearer ${localStorage.getItem("blog-access-token")}`;
      axios
        .post(
          "/users/auto-login",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setLoading(true);
          if (response.status === 200) {
            localStorage.setItem("blog-user", JSON.stringify(response.data));
          } else {
            dispatch(LogOut());
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [loading, dispatch]);
  if (loading) {
    return (
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    );
  } else
    return (
      <div className="App">
        <Navibar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<AllPost />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/my-blogs/:userId" element={<MyBlogs />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
          <Route path="/blog/add" element={<AddBlog />} />
          <Route path="/blog/view/:id" element={<ViewBlog />} />
          <Route path="/user" element={<DashBoard />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </div>
    );
}

export default App;
