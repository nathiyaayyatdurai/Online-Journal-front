import { combineReducers } from "redux";
import { allBlogsReducer } from "./allBlogsReducer";
import { userBlogReducer } from "./userBlogReducer";
import { userReducer } from "./userReducer";
import { viewBlogReducer } from "./viewBlogReducer";

export default combineReducers({
  user: userReducer,
  blogs: allBlogsReducer,
  viewBlog: viewBlogReducer,
  userBlog: userBlogReducer,
});
